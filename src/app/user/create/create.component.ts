import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../auth/auth.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/components/auth/user.service';

@Component({
  selector: '.users',
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

  userFormCreate: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.userFormCreate = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/)]],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userFormCreate.invalid) {
      console.error('Form is invalid. Cannot proceed with submission.');
      return;
    }

    alert('User creation successful!');
    // Navigate to another route or perform other actions after submission
    // this.router.navigate(['/success']);
  }
}
