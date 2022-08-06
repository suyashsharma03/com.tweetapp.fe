export interface UserDetails {
    emailId: string;
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    token: string;
}

export interface UserLogin {
    emailId: string;
    password: string;
}