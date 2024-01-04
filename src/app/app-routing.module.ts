import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './shared/components/auth/auth.guard';
import { CreateUserComponent } from './user/create/create.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: DashboardComponent,canActivate: [AuthGuard],
    children: [
      {
        path: 'user', component: UserComponent,
        children: [
          { path: 'create', component: CreateUserComponent }
        ]
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
