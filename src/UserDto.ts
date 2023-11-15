import {UserEntity} from "./UserEntity";
import {Wzuh} from "./Wzuh";

@Wzuh
export class UserDto {
  constructor(params?: UserEntity | { email: string; password: string; }) {}

  email!: string;
  firstName!: string;
  lastName!: string;
  phone!: string;
  country!: string;
  city!: string;
  address!: string;
  postalCode!: string;
  birthDate!: Date;
}
