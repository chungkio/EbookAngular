import { Component } from '@angular/core';
import { UserModel } from '../../shared/components/auth/user.model';
import { AuthService } from '../../shared/components/auth/auth.service';
import { UserStorageService } from './user-storage.service';
import { UserFilterPipe } from './../pipes/user-filter.pipe';

@Component({
  selector: '.users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListUsersComponent {
  selectedRole: string = 'all';
  allUsers: UserModel[] = [];
  filteredUsers: UserModel[] = [];
  usersPerPage: number = 10;
  currentPage: number = 1;

  constructor(
    private userStorageService: UserStorageService,
    private userFilterPipe: UserFilterPipe,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.allUsers = this.userStorageService.getUsers();
    this.filterUsers();
  }

  onRoleChange() {
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.userFilterPipe.transform(this.allUsers, this.selectedRole);
    this.currentPage = 1; // Reset to the first page when filters change
  }

  getPaginatedUsers(): UserModel[] {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  removeUser(username: string): void {
    this.authService.removeUser(username);
    this.loadUsers(); // Reload users after removal
  }

  editUser(username: any): void {
    this.authService.editUser(username);
  }

  // Pagination logic
  totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages()) {
      this.currentPage = pageNumber;
    }
  }

  generateNumberArray(size: number): number[] {
    return Array.from({ length: size }, (_, index) => index + 1);
  }
}
