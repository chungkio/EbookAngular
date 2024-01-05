import { Component } from '@angular/core';
import { UserService } from '../shared/components/auth/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  {
  constructor(private userService: UserService) {}
}
