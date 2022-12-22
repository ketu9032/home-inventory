
export interface IAccountData {
    id: number,
    userName: string,
    bankName: string,
    accountHolderFullName: string,
    branchName: string,
    accountNumber: number,
    balance: number;
    ifscCode: string
}

export interface IAccountParams {
    id?: number,
    userName: string,
    bankName: string,
    accountHolderFullName: string,
    branchName: string,
    accountNumber: number,
    ifscCode: string,
    balance: number;
}

