import { AuthService } from '../../shared/components/auth/auth.service';
import { Component } from '@angular/core';
import { UserModel } from '../../shared/components/auth/user.model';

@Component({
  selector: '.users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListUsersComponent {
  users: UserModel[] = [];
  itemsPerPage = 10;
  pages: number[] = []; // Add this line
  currentPage = 1;
  private keyUser = 'listUser';
  selectedRole: string = 'all';

  constructor(private AuthService: AuthService) {}
  // Use ngOnInit to initialize data
  ngOnInit(): void {
    const localStorageUsers = localStorage.getItem(this.keyUser);
    // Parse users if exists, otherwise use an empty array
    this.users = localStorageUsers ? JSON.parse(localStorageUsers) : [];
    this.initializePagination();
    this.users = this.getUsersForPage(this.currentPage);
  }

  public onRoleChange(): void {
    this.currentPage = 1;
    this.updateFilteredUsers();
  }

  private updateFilteredUsers(): void {
    this.users = this.getFilteredUsers();
    this.updatePagination(); // Update pagination after filtering
    this.users = this.getUsersForPage(this.currentPage);
  }

  private updatePagination(): void {
    const totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (key, i) => i + 1);
  }

  private getFilteredUsers(): UserModel[] {
    const filteredUsers = this.users.filter(user => this.selectedRole === 'all' || user.role === this.selectedRole);
    this.updatePagination(); // Update pagination after filtering
    return filteredUsers;
  }

  private initializePagination(): void {
    const totalPages = Math.ceil(this.getFilteredUsers().length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (key,i) => i + 1);
  }

  // Method to get users for the current page
  getUsersForPage(pageNumber: number): UserModel[] {
    const filteredUsers = this.getFilteredUsers(); // Get filtered users based on selected role
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }


  changePage(pageNumber: number): void {
    const localStorageUsers = localStorage.getItem(this.keyUser);
    // Parse users if exists, otherwise use an empty array
    this.users = localStorageUsers ? JSON.parse(localStorageUsers) : [];
    this.currentPage = pageNumber;
    this.users = this.getUsersForPage(this.currentPage);
  }

  removeUser(username: string): void {
    this.AuthService.removeUser(username);
  }

  editUser(username: any):void {
    this.AuthService.editUser(username);
  }

}
