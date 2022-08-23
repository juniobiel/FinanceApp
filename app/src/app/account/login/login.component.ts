import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fromEvent, merge, Observable } from 'rxjs';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CustomValidators } from '@narik/custom-validators';

import { GenericValidator, ValidationMessages } from 'src/app/Utils/generic-form-validation';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageUtils } from 'src/app/Utils/localstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef }) 
  formInputElements: ElementRef[];
  faUser = faUser;
  loginForm : FormGroup;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage = {};
  user: User;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(private fb : FormBuilder, 
    private accountService: AccountService, 
    private router : Router,
    private toastr: ToastrService ) {

    this.validationMessages = 
    {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
   }
   this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, CustomValidators.rangeLength([6,15])]]
      }
    );
  }

  ngAfterViewInit(): void 
  {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    
    merge(...controlBlurs).subscribe( () => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    })
  }

  loginAccount()
  {
    if(this.loginForm.dirty && this.loginForm.valid)
    {
      this.user = Object.assign({}, this.user, this.loginForm.value);
      this.accountService.login(this.user)
      .subscribe(
        {
          next: (response) => this.processSuccess(response),
          error : (fail) => this.processFail(fail),
        }
      );
    }
  }

  processSuccess(response : any)
  {
    this.loginForm.reset();
    this.errors = [];
    this.localStorageUtils.saveUserLocalData(response);
    this.router.navigate(['home']);
  }

  processFail(fail : any)
  {
    this.toastr.error('Usuário ou senha incorretos', 'Ocorreu um erro!!', {
      closeButton: true,
      positionClass: 'toast-top-full-width'
    });
    this.loginForm.reset();
  }

}
