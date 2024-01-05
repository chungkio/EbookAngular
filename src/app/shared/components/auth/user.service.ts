import { UserModel } from './user.model';


export class UserService {

  private roles = ['user', 'admin', 'editor'];
  private localStorageKey = 'listUser';
  private demoUsers: UserModel[]; // Declare demoUsers as a class property

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

  public login(username: string, password: string): UserModel | undefined {
    return this.demoUsers.find(user => user.username === username && user.password === password);
  }

  createUser(user: UserModel): void {
    const existingDataString = localStorage.getItem(this.localStorageKey);
    let existingData: UserModel[] = existingDataString ? JSON.parse(existingDataString) : [];

    // Add new user data
    const submittedData: UserModel = { ...user };
    existingData.push(submittedData);
    // Save updated data back to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(existingData.reverse()));
  }

}
