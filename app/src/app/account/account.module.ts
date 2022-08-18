import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';

import { AccountRoutingModule } from './account.routes';

import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';

import { AccountService } from './services/account.service';


@NgModule({
  declarations: 
  [
    AccountAppComponent,
    CreateAccountComponent,
    LoginComponent
  ],
  imports: 
  [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NarikCustomValidatorsModule
  ],
  providers:
  [
    AccountService
  ]
})
export class AccountModule { }
