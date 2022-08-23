import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/Utils/localstorage";

import { CreateAccountComponent } from "../create-account/create-account.component";


@Injectable()
export class AccountGuard implements CanDeactivate<CreateAccountComponent>, CanActivate
{
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router){}
  canDeactivate(component: CreateAccountComponent) 
  {
    if(component.NotSavedChanges)
    {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?')
    }
    return true;
  }
  
  canActivate() {
    if(this.localStorageUtils.getUserToken())
    {
      this.router.navigate(['/home']);
    }
    return true;
  }
}