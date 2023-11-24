import { Mapper } from '../src';
import {UserEntity} from "./UserEntity";

export class UserDto {
  firstName: string;
  lastName: string;
  fullName: string;
  address: {
    street: string;
    number: string;
  };
  birthDate: Date;
  postCode: string;

  // @Mapper({
  //   map: {
  //     fullName: (obj: any) => `${obj.firstName} ${obj.lastName}`,
  //     address: (obj: any) => ({
  //       street: obj.address.street,
  //       city: obj.address.city,
  //     })
  //   }
  // })
  // static fromUserEntity(obj: object): UserDto {
  //   return;
  // }

  @Mapper({
    map: {
      postCode: 'address.number',
      fullName: (obj: any) => `${obj.firstName} ${obj.lastName}`,
      address: {
        value: {
          street: (obj: any) => `${obj.firstName} ${obj.lastName}`,
          number: {
            value: 'address.number',
            nullable: false,
            optional: false,
          }
        },
        nullable: false
      },
    }
  })
  static fromUserEntity(obj: UserEntity): UserDto {
    return;
  }
}
