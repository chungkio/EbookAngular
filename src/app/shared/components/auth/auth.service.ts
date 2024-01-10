import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  private tokenName = 'UserToken';

  constructor(
    private router: Router, private userService: UserService,
    ) {
    const storedUser = localStorage.getItem(this.tokenName);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
    this.saveToken(JSON.stringify(user));
  }

  public getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  public isAdmin(): boolean {
    const user = this.getCurrentUser();
    if (user && (user.role === 'admin' || user.role === 'editor')) {
      return true;
    } else {
      return false;
    }
  }

  public login(username: string, password: string): boolean {
    const currentUser = this.userService.login(username, password);
    if (currentUser) {
      this.setCurrentUser(currentUser);
      this.userIsLoggedIn(); // Removed redundant call to this method
      this.redirectLogin();
      return true;
    } else {
      return false;
    }
  }

  public redirectLogin(): void {
    if (this.isAdmin()) {
      this.redirectToAdmin();
    } else {
      this.redirectToHome();
    }
  }

  public getToken(): any {
    return localStorage.getItem(this.tokenName) || false;
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  private redirectToAdmin(): void {
    this.router.navigate(['/admin/user']);
  }

  private redirectToHome(): void {
    this.router.navigate(['']);
  }

  public redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  public logout(): void {
    localStorage.removeItem(this.tokenName);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  public userIsLoggedIn(): Observable<boolean> {
    return this.currentUserSubject.pipe(map(user => !!user));
  }

  removeUser(username: string): void {
    // Call the removeUser method from the UserService
    this.userService.removeUser(username).subscribe(result => {
      if (result.success) {
        // User removal was successful, update the user list
        alert('User removed successfully');
      } else {
        // Handle the error or reason for failure
        console.error(result.reason);
      }
    });
  }

  editUser(username: any): void {
    this.router.navigate(['admin/user/edit', username]);
  }

}
