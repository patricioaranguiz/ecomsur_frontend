export class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  groups: string[];
  employment: string;
  workstations: string;
  phoneNumber: number;
  streetAddress: string;
  company: string;
  department: string;
  rut: string;

  constructor(item?: any) {
    this.username = item.userName;
    this.firstName = item.firstName;
    this.lastName = item.lastName;
    this.email = item.mail;
    this.groups = item.groups;
    this.employment = item.title;
    this.workstations = item.workstations;
    this.phoneNumber = item.telephoneNumber;
    this.streetAddress =  item.streetAddress;
    this.company = item.company;
    this.department = item.department;
    this.rut = item.description;
  }
}
