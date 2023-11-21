import {UserDto} from "./UserDto";

const userDto = UserDto.fromUserEntity({
  firstName: "firstName",
  lastName: "lastName",
  userName: "userName",
  address: {
    street: "street",
    city: "city",
  }
})

console.log(userDto);
