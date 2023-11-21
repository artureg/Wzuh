import { Mapper } from '../src';
import {UserEntity} from "./UserEntity";

export class UserDto {
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;

  @Mapper({
    map: {
      firstName: 'lastName',
      fullName: {
        value: (params: any) => `${params.firstName} ${params.lastName}`,
      },
      address: {
        value: 'address.street',
        optional: false,
        nullable: false,
      }
    },
    exclude: ['lastName']
  })

  static toUserDto(obj: object): UserDto {
    return;
  }

  static fromUserDto(user: UserDto): {firstName: string, lastName: string} {
    return;
  }


}
