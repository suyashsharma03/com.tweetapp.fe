export interface UserDetails {
    emailId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    token: string;
}

export interface UserLogin {
    emailId: string;
    password: string;
}

export interface ForgotPassword {
    oldPassword: string;
    newPassword: string;
}

export interface ResetPassword {
    emailId: string;
    securityQuestion: number;
    securityAnswer: string;
}