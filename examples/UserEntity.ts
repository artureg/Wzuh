export class UserEntity {

  constructor({country, city, address, postalCode, birthDate, email, firstName, lastName, phone, password}: {
    country: string;
    city: string;
    address: {
      street: string,
      number: string,
    },
    postalCode: string;
    birthDate: Date;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
  }) {
    this.country = country;
    this.city = city;
    this.address = address;
    this.postalCode = postalCode;
    this.birthDate = birthDate;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.password = password;
  }

  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  phone!: string;
  country!: string;
  city!: string;
  address!: {
    street: string;
    number: string;
  };
  postalCode!: string;
  birthDate!: Date;
}
