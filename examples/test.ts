import {UserDto} from "./UserDto";
import {UserEntity} from "./UserEntity";

console.log("_______________________");


// const user1 = new UserDto();
// console.log(JSON.stringify(user1));

const user2 = UserDto.fromEmailPasswordObj({email: "123", password: 123, birthDate: new Date()});
console.log(JSON.stringify(user2));


const entity3 = new UserEntity({
  country: "count",
  city: "cit",
  address: {
    street: "AdrStr",
    number: "AdrNum",
  },
  postalCode: "pCode",
  birthDate: new Date(),
  email: "e-mai.l",
  firstName: "fN",
  lastName: "lN",
  phone: "+phone",
  password: "qwerty134"
})
const user3 = UserDto.fromUserEntity(entity3);
console.log(JSON.stringify(user3));
