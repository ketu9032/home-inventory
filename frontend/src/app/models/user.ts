
export interface IUserData {
    id: number, user_name: string, password: string, mobile_number: string, balance: string,
}

export interface IUserParams {
    id?: number, userName: string, password: string, mobileNumber: string,  balance: string,
}
export interface IUserActiveParams {
    id: number, status: boolean
}

export interface IUserName{
    userName: string;
}
