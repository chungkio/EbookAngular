// create-user.component.ts
import { Component } from '@angular/core';
import { UserModel } from '../../auth/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateUserComponent {
  userData: UserModel = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    role: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    const submittedData: UserModel = { ...this.userData };
    // Save data to localStorage or perform any other actions
    localStorage.setItem('userData', JSON.stringify(submittedData));
    alert('User creation successful!');
  }
}
