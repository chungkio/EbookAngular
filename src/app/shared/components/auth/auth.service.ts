// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;

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
      this.setCurrentUser(currentUser);
      if (this.isAdmin()) {
        this.redirectToAdmin();
      } else {
        this.redirectToHome();
      }

      return true; // Return true on successful login
    } else {
      console.log('Login failed');
      // Handle login failure (e.g., show an error message or redirect to an error page)
      return false; // Return false on login failure
    }
  }

  private redirectToAdmin(): void {
    this.router.navigate(['/admin']); // Replace '/admin' with the actual route for the admin section
  }

  private redirectToHome(): void {
    this.router.navigate(['']); // Redirect to the home page
  }
}
