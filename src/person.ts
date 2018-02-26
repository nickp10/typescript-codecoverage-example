export default class Person {
    firstName: string;
    lastName: string;

    getFullName(): string {
        return this.firstName + " " + this.lastName;
    }

    getLastName(): string {
        return this.lastName;
    }
}
