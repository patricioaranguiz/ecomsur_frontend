export class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  groups: string[];

  constructor(item?: any) {
    this.username = item.userName;
    this.firstName = item.firstName;
    this.lastName = item.lastName;
    this.groups = item.groups;
    this.email = item.mail;
  }
}
