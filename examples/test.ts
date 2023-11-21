import {UserDto} from "./UserDto";

const userDto = UserDto.toUserDto({
  firstName: "firstName",
  lastName: "lastName",
  userName: "userName",
  address: {
    street: "street",
    city: "city",
  }
})

console.log(userDto);


const obj = UserDto.fromUserDto({
  firstName: "firstName",
  lastName: "lastName",
} as UserDto)

console.log(obj)



