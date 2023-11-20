import {UserEntity} from "./UserEntity";
import {Wzuh} from "../src";
import { Mapable, WzuhParams } from '../src/Wzuh';

@Wzuh()
export class UserDto {
  constructor(@WzuhParams params?: UserEntity | { email: string; password: string; }) {}

  @Mapable()
  email!: string;
  @Mapable()
  firstName!: string;
  @Mapable('firstName')
  lastName!: string;
  @Mapable()
  phone!: string;
  @Mapable()
  country!: string;
  @Mapable()
  city!: string;
  @Mapable()
  address!: string;
  @Mapable()
  postalCode!: string;
  @Mapable()
  birthDate!: Date;
}
