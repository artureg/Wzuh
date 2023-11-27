import {UserDto} from "./UserDto";
import { UserEntity } from './UserEntity';

const userDto = UserDto.fromUserEntity(new UserEntity({
  firstName: "firstName",
  lastName: "lastName",
  address: {
    street: "street",
    number: "city",
  },
  birthDate: new Date(),
}))

console.log(userDto);
