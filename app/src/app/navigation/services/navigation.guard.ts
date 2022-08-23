import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/Utils/localstorage";
import { HomeComponent } from "../home/home.component";

@Injectable()
export class NavigationGuard implements CanActivate
{
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {}

  canActivate() : boolean
  {
    if(!this.localStorageUtils.getUserToken())
    {
      this.router.navigate(['/account/login']);
    }
    return true;
  }
}