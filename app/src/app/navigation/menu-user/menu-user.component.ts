import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { LocalStorageUtils } from "src/app/Utils/localstorage";

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html'
})
export class MenuUserComponent 
{
  token: string = "";
  user: any;
  email: string = "";
  localStorageUtils = new LocalStorageUtils();
  faSignOutAlt = faSignOutAlt;

  constructor(private router : Router) {}

  userLogged() : boolean 
  {
    this.token = this.localStorageUtils.getUserToken();
    this.user = this.localStorageUtils.getUser();

    if(this.user)
      this.email = this.user.email;

    return this.token !== null;
  }

  logout() 
  {
    this.localStorageUtils.cleanUserLocalData();
    this.router.navigate(['/account/login']);
  }
}