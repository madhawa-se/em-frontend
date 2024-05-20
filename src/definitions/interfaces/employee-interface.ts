export enum Gender {
    Male = 'M',
    Female = 'F',
    NOT_SPECIFIED = 'N'
}

export interface IEmployee {
    id?: string,
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: Gender;
    photo: string;
}