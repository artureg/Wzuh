import {UserEntity} from "./UserEntity";
import { Mapper } from '../src/Wzuh';

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
  fullName!: string;

  @Mapper({
    firstName: 'lastName',
    lastName: 'firstName',
    address: 'address.street',
  })
  static fromUserEntity(userEntity: UserEntity) {}
}
