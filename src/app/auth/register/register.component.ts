import { AuthService } from '../../shared/components/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserModel } from '../../shared/components/auth/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/components/auth/user.service';

@Component({
  selector: 'create-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isCreated = false;
  public isErorr = false;
  userFormRegister!: FormGroup;

  userData: UserModel = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    role: 'user'
  };

  constructor(private AuthService: AuthService,  private userService: UserService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.userFormRegister = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/)]],
      password2: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/)]],
    },
    { validator: this.passwordsMatchValidator });
  }

  private passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const password2 = group.get('password2')?.value;

    return password === password2 ? null : { passwordsNotMatch: true };
  }

  get userFormRegisterControl() {
    return this.userFormRegister.controls;
  }

  // Helper function to access form controls dynamically
  getFormControl(controlName: string): AbstractControl {
    return this.userFormRegister.get(controlName) as AbstractControl;
  }

  onSubmitRegisterUser() {
    this.userFormRegister.valueChanges.subscribe(value => {
      console.log('Form Value Changes:', value);
    });
    if (this.userFormRegister.invalid) {
      this.isErorr = true;
      return;
    }

    this.userService.createUser(this.userFormRegister.value).subscribe(
      (response) => {
        if (response.success) {
          // User creation successful
          alert('User creation successful!');
          this.userFormRegister.reset();
          this.AuthService.redirectToLogin();
        } else {
          // User creation failed, handle the reason
          console.error('Error creating user:', response.reason);
          if (response.reason === 'User already exists') {
            alert('User already exists. Please choose a different username.');
          } else {
            alert('An error occurred while creating the user.');
          }
        }
      },
      (error) => {
        console.error('Unexpected error creating user:', error);
        alert('An unexpected error occurred while creating the user.');
      }
    );
  }
}
