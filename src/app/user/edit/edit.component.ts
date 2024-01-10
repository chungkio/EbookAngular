import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserModel } from '../../shared/components/auth/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/components/auth/user.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditUserComponent implements OnInit {
  public isCreated = false;
  public isError = false;

  userFormEdit!: FormGroup;

  userData: UserModel = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    role: ''
  };

  constructor(
    private userService: UserService,
    private routeActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {
    // Fetch the user data to be edited based on the route parameter
    const username = this.routeActive.snapshot.paramMap.get('username');

    if (username !== null) {
      const user = this.userService.getUserByUsername(username);

      if (user) {
        this.userData = user;

        // Initialize the form with the fetched user data
        this.initializeForm();
      } else {
        // Handle the case where the user is not found
        console.error(`User with username '${username}' not found.`);
        // Optionally, you can navigate the user to another page or display an error message.
      }
    } else {
      // Handle the case where 'username' is null (optional, depending on your requirements)
      console.error('Username is null.');
      // Optionally, you can navigate the user to another page or display an error message.
    }
  }

  private initializeForm() {
    this.userFormEdit = this.formBuilder.group({
      first_name: [this.userData.first_name, Validators.required],
      last_name: [this.userData.last_name, Validators.required],
      username: [this.userData.username, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      email: [this.userData.email, [Validators.required, Validators.email]],
      password: [this.userData.password, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/)]],
    });
  }

  get userFormEditControl() {
    return this.userFormEdit.controls;
  }

  // Helper function to access form controls dynamically
  getFormControl(controlName: string): AbstractControl {
    return this.userFormEdit.get(controlName) as AbstractControl;
  }

  onSubmitEditUser() {
    if (this.userFormEdit.invalid) {
      this.isError = true;
      return;
    }

    // Update the user data with the form values
    const updatedUser: UserModel = {
      ...this.userData,
      ...this.userFormEdit.value
    };

    // Call the UserService to edit the user
    this.userService.editUser(updatedUser).subscribe(result => {
      // Handle the result
      if (result.success) {
        // User edit was successful, perform other actions if needed
        alert('User edited successfully');
        this.route.navigate(['admin/user']);
      } else {
        // Handle the error or reason for failure
        alert('User edit failed');
      }
    });
  }
}
