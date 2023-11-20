import {UserEntity} from "./UserEntity";
import { Mappable, Mapper } from '../src/Wzuh';

export class UserDto {
  constructor(params?: UserEntity | { email: string; password: string; }) {}

  @Mappable()
  email!: string;
  @Mappable()
  firstName!: string;
  @Mappable()
  lastName!: string;
  @Mappable()
  phone!: string;
  @Mappable()
  country!: string;
  @Mappable()
  city!: string;
  @Mappable()
  address!: string;
  @Mappable()
  postalCode!: string;
  @Mappable()
  birthDate!: Date;

  @Mapper()
  static fromUserEntity(userEntity: UserEntity) {}
}
