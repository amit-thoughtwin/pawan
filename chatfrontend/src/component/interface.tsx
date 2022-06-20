export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;

}

export interface IGeo {
    lat : string;
    lng: string
}

export interface ICompany {
    name: string;
    catchPharase: string;
    bs: string;
}
