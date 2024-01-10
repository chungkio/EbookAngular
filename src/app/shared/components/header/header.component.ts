import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: '#site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isLogin = false;
  public userNameLogined = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const auth = this.authService.getToken();
    if (auth) {
      this.authService.userIsLoggedIn().subscribe((loggedIn: boolean) => {
        this.isLogin = loggedIn;
      });
      this.authService.setCurrentUser(JSON.parse(auth));
      this.authService.redirectLogin();
      this.userNameLogined = auth.username;
    }
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userNameLogined = currentUser.username;
    }
  }

  logout(): void {
    this.authService.logout();
    this.authService.userIsLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLogin = loggedIn;
    });
  }
}
