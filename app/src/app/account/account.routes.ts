import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountAppComponent } from "./account.app.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { LoginComponent } from "./login/login.component";


const accountRouterConfig: Routes = 
[
  {
    path:'', component: AccountAppComponent,
    children: 
    [
      { path: 'newAccount', component: CreateAccountComponent},
      { path: 'login', component: LoginComponent}
    ]
  }
]

@NgModule(
  {
    imports:
    [
      RouterModule.forChild(accountRouterConfig)
    ],
    exports:
    [RouterModule]
  }
)
export class AccountRoutingModule {}