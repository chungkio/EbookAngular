import { UserModel } from './user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';


export class UserService {

  private roles = ['user', 'admin', 'editor'];
  private localStorageKey = 'listUser';
  private demoUsers: UserModel[]; // Declare demoUsers as a class property

  private selectedUserSubject = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor() {
    const numberOfUsers = 30;

    // Check if localStorage contains listUser
    this.demoUsers = JSON.parse(localStorage.getItem('listUser') || '[]');

    // If listUser does not exist, create and save it to localStorage
    if (this.demoUsers.length === 0) {
      this.demoUsers = [];
      for (let i = 1; i <= numberOfUsers; i++) {
        const user = this.generateRandomUser(i);
        this.demoUsers.push(user);
      }
      this.demoUsers.reverse();
      localStorage.setItem('listUser', JSON.stringify(this.demoUsers));
    }

    console.log(this.demoUsers);
  }

  private getRandomRole(): string {
    const randomIndex = Math.floor(Math.random() * this.roles.length);
    return this.roles[randomIndex];
  }

  private generateRandomUser(index: number): UserModel {
    const username = `user${index}`;
    const date_create = new Date().toISOString();
    const email = `user${index}@example.com`;
    const first_name = `FirstName${index}`;
    const last_name = `LastName${index}`;
    const password = `password${index}`;
    const role = this.getRandomRole();

    return {
      username,
      date_create,
      email,
      first_name,
      last_name,
      password,
      role,
    };
  }

  login(username: string, password: string): UserModel | undefined {
    return this.demoUsers.find(user => user.username === username && user.password === password);
  }

  setUsers(users: UserModel[]): void {
    this.demoUsers = users;
  }

  getUsers(): Observable<UserModel[]> {
    // Simulate an asynchronous operation, such as fetching data from a server
    return of(this.demoUsers);
  }

  createUser(user: UserModel): Observable<{ success: boolean, reason?: string }> {
    const existingDataString = localStorage.getItem(this.localStorageKey);
    let existingData: UserModel[] = existingDataString ? JSON.parse(existingDataString) : [];

    // Check if the user already exists
    const userExists = existingData.some(existingUser => existingUser.username === user.username);

    if (userExists) {
      // Return an observable indicating that the user already exists
      return of({ success: false, reason: 'User already exists' });
    }

    // Add new user data
    const submittedData: UserModel = { ...user };
    existingData.push(submittedData);

    // Save updated data back to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(existingData.reverse()));

    // Return an observable indicating successful user creation
    return of({ success: true });
  }

  editUser(updatedUser: UserModel): Observable<{ success: boolean, reason?: string }> {
    const userIndex = this.demoUsers.findIndex(user => user.username === updatedUser.username);

    if (userIndex === -1) {
      return of({ success: false, reason: 'User not found' });
    }

    // Update user information
    this.demoUsers[userIndex] = { ...this.demoUsers[userIndex], ...updatedUser };

    // Save updated data back to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.demoUsers));

    // Notify subscribers about the user change
    this.setUserChange(updatedUser);

    return of({ success: true });
  }

  private setUserChange(user: any) {
    this.selectedUserSubject.next(user);
  }

  removeUser(username: string): Observable<{ success: boolean, reason?: string }> {
    const existingDataString = localStorage.getItem(this.localStorageKey);
    let existingData: UserModel[] = existingDataString ? JSON.parse(existingDataString) : [];

    // Check if the user to be removed exists
    const userIndex = existingData.findIndex(user => user.username === username);

    if (userIndex === -1) {
      // Return an observable indicating that the user does not exist
      return of({ success: false, reason: 'User not found' });
    }

    // Remove the user from the array
    existingData.splice(userIndex, 1);

    // Save updated data back to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(existingData));

    // Return an observable indicating successful user removal
    return of({ success: true });
  }

  getUserByUsername(username: string): UserModel | undefined {
    return this.demoUsers.find(user => user.username === username);
  }

}
