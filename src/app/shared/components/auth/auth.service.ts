import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  private tokenName = 'UserToken';

  constructor(private router: Router, private userService: UserService) {}

  // Method to set the current user (this may be called during login)
  public setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  // Method to get the current user
  public getCurrentUser(): any {
    return this.currentUser;
  }

  public isAdmin(): boolean {
    const user = this.getCurrentUser();
    // Check if the user's role is 'admin'
    return user && user.role === 'admin';
  }

  public login(username: string, password: string): boolean {
    const currentUser = this.userService.login(username, password);
    if (currentUser) {
      this.saveToken(JSON.stringify(currentUser)); // currentUser has a 'token' property
      this.setCurrentUser(currentUser);
      this. redirectLogin();
      return true; // Return true on successful login
    } else {
      console.error('Login failed');
      // Handle login failure (e.g., show an error message or redirect to an error page)
      return false; // Return false on login failure
    }
  }

  public redirectLogin():void {
    if (this.isAdmin()) {
      this.redirectToAdmin();
    } else {
      this.redirectToHome();
    }
  }

  public getToken(): any {
    const token = localStorage.getItem(this.tokenName);
    if (token) {
      return token;
    } else {
      return false;
    }
  }

  private saveToken(token: string): void {
    // Save the token to local storage or a cookie
    localStorage.setItem(this.tokenName, token);
  }

  private redirectToAdmin(): void {
    this.router.navigate(['/admin/user']); // Replace '/admin' with the actual route for the admin section
  }

  private redirectToHome(): void {
    this.router.navigate(['']); // Redirect to the home page
  }
}
