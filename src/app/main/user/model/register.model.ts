export interface UserRegistration {
    emailId: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    dateofbirth: Date;
    gender: string;
    securityQuestion: number;
    securityAnswer: string;
    phone: number;
}