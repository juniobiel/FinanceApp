import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navigation/home/home.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';
import { NavigationGuard } from './navigation/services/navigation.guard';

const routes: Routes = 
[
  { path: '', redirectTo: '/account/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [NavigationGuard] },
  { path: 'account',
    loadChildren: () => import('./account/account.module')
    .then(m => m.AccountModule)
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
