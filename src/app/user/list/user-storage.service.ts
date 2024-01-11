import { Injectable } from '@angular/core';
import { UserModel } from '../../shared/components/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private keyUser = 'listUser';

  getUsers(): UserModel[] {
    const storedUsers = localStorage.getItem(this.keyUser);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  saveUsers(users: UserModel[]): void {
    localStorage.setItem(this.keyUser, JSON.stringify(users));
  }
}
