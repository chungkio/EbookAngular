import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: '#site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isLogin = false;

  constructor( private authService: AuthService){}
  ngOnInit(): void {
    const auth = this.authService.getToken();
    if(auth){
      this.isLogin = true;
      this.authService.setCurrentUser(JSON.parse(auth));
      this.authService.redirectLogin();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
