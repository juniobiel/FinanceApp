import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MenuUserComponent } from "./menu-user/menu-user.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule(
  {
    declarations: 
    [
      MenuComponent,
      HomeComponent,
      FooterComponent,
      NotFoundComponent,
      MenuUserComponent
    ],
    imports: 
    [
      CommonModule,
      RouterModule,
      NgbModule,
      FontAwesomeModule,
    ],
    exports: 
    [
      MenuComponent,
      HomeComponent,
      FooterComponent,
      NotFoundComponent,
    ]
  }
)
export class NavigationModule {}