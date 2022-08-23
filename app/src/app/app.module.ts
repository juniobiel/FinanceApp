import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { NavigationGuard } from './navigation/services/navigation.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    NavigationModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    NavigationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
