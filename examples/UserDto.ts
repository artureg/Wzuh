import {UserEntity} from "./UserEntity";
import { Mapper } from '../src/Wzuh';

export class UserDto {
  constructor() {}

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
    map: {
      email: 'birthDate'
    }
  })
  static fromEmailPasswordObj(params: {email: string, password: number, birthDate: Date}) {}

  @Mapper({
    map: {
      firstName: 'lastName',
      lastName: 'firstName',
      address: (params: UserEntity) => `${params.address.street} ${params.address.number}`,
      email: 'address.street',
      city: {
        value: 'sdf',
        nullable: true,
        optional: true,
      },
    },
    // exclude: ['address'],
  })
  static fromUserEntity(userEntity: UserEntity): UserDto {
    return;
  }
}
