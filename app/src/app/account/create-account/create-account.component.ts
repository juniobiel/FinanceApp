import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Utils/generic-form-validation';
import { User } from '../models/User';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html'
})
export class CreateAccountComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef }) 
  formInputElements: ElementRef[];
  errors: any[] = [];
  createAccountForm: FormGroup;
  user: User;
  validationMessages : ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  NotSavedChanges : boolean;

  constructor(private fb : FormBuilder, 
    private accountService: AccountService,
    private router : Router,
    private toastr: ToastrService) 
  { 
    this.validationMessages = 
    {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não são iguais'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  
  ngOnInit(): void 
  {
    let passwordValidator = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let passwordConfirmValidator = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(passwordValidator)])
    this.createAccountForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: passwordValidator,
        confirmPassword: passwordConfirmValidator
      }
    )
  }
    
  ngAfterViewInit(): void 
  {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    
    merge(...controlBlurs).subscribe( () => {
      this.displayMessage = this.genericValidator.processMessages(this.createAccountForm);
      this.NotSavedChanges = true;
    })
  }

  addAccount()
  {
    if(this.createAccountForm.dirty && this.createAccountForm.valid)
    {
      this.user = Object.assign({}, this.user, this.createAccountForm.value);
      this.accountService.registerUser(this.user)
      .subscribe(
        {
          next: (response) => this.processSuccess(response),
          error : (fail) => this.processFail(fail),
        }
      );
      this.NotSavedChanges = false;
    }
  }
  
  processSuccess(response : any)
  {
    this.createAccountForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Sua conta foi cadastrada com sucesso, faça o login!', 'Cadastrado!', {
      closeButton: true,
      positionClass: 'toast-top-full-width'
    });
    if(toast)
    {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['account/login']);
      })
    }
  }

  processFail(fail : any)
  {
    this.errors = fail.error.split(',');
    this.toastr.error('Não foi possível concluir o cadastro!', 'Ocorreu um erro!!', {
      closeButton: true,
      positionClass: 'toast-top-full-width'
    });
    
  }
}
