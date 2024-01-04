import { Component, OnInit } from '@angular/core';
import { UserModel } from '../shared/components/auth/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public users: UserModel[] = [];
  public itemsPerPage = 10;
  public pages: number[] = []; // Add this line
  public currentPage = 1;

  // Use ngOnInit to initialize data
  ngOnInit(): void {
    const localStorageUsers = localStorage.getItem('listUser');
    // Parse users if exists, otherwise use an empty array
    this.users = localStorageUsers ? JSON.parse(localStorageUsers) : [];
    this.initializePagination();
    this.users = this.getUsersForPage(this.currentPage);
  }


  private initializePagination(): void {
    const totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (key,i) => i + 1);
  }

  // Method to get users for the current page
  public getUsersForPage(pageNumber: number): UserModel[] {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  public changePage(pageNumber: number): void {
    const localStorageUsers = localStorage.getItem('listUser');
    // Parse users if exists, otherwise use an empty array
    this.users = localStorageUsers ? JSON.parse(localStorageUsers) : [];
    this.currentPage = pageNumber;
    this.users = this.getUsersForPage(this.currentPage);
  }
}
