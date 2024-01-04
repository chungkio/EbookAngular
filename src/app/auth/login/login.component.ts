import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/components/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected username: string = '';
  protected password: string = '';

  // Inject Router and AuthService in the constructor
  constructor(private router: Router, private authService: AuthService) {}

  public login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.redirectToUserListing();
    } else {
      console.log('Login failed');
    }
  }

  private redirectToUserListing(): void {
    this.router.navigateByUrl('/admin/user');
  }
}
