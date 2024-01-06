// Update the import statement for AbstractControl
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserModel } from '../../auth/auth.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/components/auth/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateUserComponent implements OnInit {
  public isCreated = false;
  public isErorr = false;
  userFormCreate!: FormGroup;

  userData: UserModel = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    role: ''
  };

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.userFormCreate = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/)]],
      role: ['', Validators.required],
    });
  }

  get userFormCreateControl() {
    return this.userFormCreate.controls;
  }

  // Helper function to access form controls dynamically
  getFormControl(controlName: string): AbstractControl {
    return this.userFormCreate.get(controlName) as AbstractControl;
  }

  onSubmitCreateUser() {
    if (this.userFormCreate.invalid) {
      this.isErorr = true;
      return;
    }

    this.userService.createUser(this.userFormCreate.value).subscribe(
      (response) => {
        if (response.success) {
          // User creation successful
          alert('User creation successful!');
          this.userFormCreate.reset();
          this.isCreated = true;// You might use this flag for other purposes in your component
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
