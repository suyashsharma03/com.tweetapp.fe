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

export interface ResetPassword {
    oldPassword: string;
    newPassword: string;
}

export interface ForgotPassword {
    emailId: string;
    securityQuestion: number;
    securityAnswer: string;
}