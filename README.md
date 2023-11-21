# Wzuh mapper

Wzuh mapper is a library for easy mapping of pojo/classes into another classes

## Usage
Create static method in class and add `@Mapper()` decorator to it.
Mapping method must take 1 parameter that is the source object.
```javascript
import { Mapper } from '../src';

class UserDto {
  firstName: string;
  lastName: string;
  fullName: string;

 @Mapper()
  static fromUserEntity(userEntity: UserEntity): UserDto {
    return;
  }
}
```
By default it will map all fields that are presented in both target class and source object, ignoring all the other fields in source object.
```javascript
const userDto = UserDto.fromUserEntity({
  firstName: "firstName",
  lastName: "lastName",
  userName: "userName"
})

console.log(userDto);
```
```
{ firstName: 'firstName', lastName: 'lastName' }
```
Mapping can be altered by `map` and `exclude` properties in decorator arg.
```javascript
export class UserDto {
  firstName: string;
  lastName: string;
  fullName: string;

  @Mapper({
    map: {
      firstName: 'lastName',
      fullName: (params: any) => `${params.firstName} ${params.lastName}`,
      address: 'address.street',
    },
    exclude: ['lastName']
  })
  static fromUserEntity(obj: object): UserDto {
    return;
  }
}
```
```javascript
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
```
```
{
  firstName: 'lastName',
  fullName: 'firstName lastName',
  address: 'street'
}
```
### Validation
Also `map` values can be passed as object with `value` field with same logic as shown above and 2 optional fields `nullable`(for null-checks) and `optional`(for undefined-checks)
```javascript
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
  static fromUserEntity(obj: object): UserDto {
    return;
  }
}
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
