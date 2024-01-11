import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create/create.component';
import { ListUsersComponent } from './list/list.component';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit/edit.component';
import { ProfileUserComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
    {
      path: '',
      component: UserComponent,
      children: [
        { path: '', component: ListUsersComponent },
        { path: 'create', component: CreateUserComponent },
        { path: 'edit/:username', component: EditUserComponent }
      ]
    }
];

  @NgModule({
    declarations: [
      CreateUserComponent,
      ListUsersComponent,
      UserComponent,
      EditUserComponent,
      ProfileUserComponent,
      UserFilterPipe
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      FormsModule,
      NgxPaginationModule,
    ],
    providers: [
      UserFilterPipe,
    ],
  })
  export class UserModule { }
