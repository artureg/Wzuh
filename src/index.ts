import {UserDto} from "./UserDto";
import {UserEntity} from "./UserEntity";

console.log("_______________________");


const user1 = new UserDto();
console.log(user1);

const user2 = new UserDto({email: "123", password: "123"});
console.log(user2);


const entity3 = new UserEntity({
  country: "123",
  city: "123",
  address: "123",
  postalCode: "123",
  birthDate: new Date(),
  email: "123",
  firstName: "123",
  lastName: "123",
  phone: "123",
  password: "123"
})
const user3 = new UserDto(entity3);
console.log(user3);


//const user4 = new UserDto({});
