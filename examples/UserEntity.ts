export class UserEntity {

  constructor({address, birthDate, firstName, lastName,}: {
    birthDate: Date,
    address: {
      street: string,
      number: string,
    },
    firstName: string;
    lastName: string;
  }) {
    this.address = address;
    this.birthDate = birthDate;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  firstName!: string;
  lastName!: string;
  address!: {
    street: string;
    number: string;
  };
  birthDate!: Date;
}
