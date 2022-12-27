
export interface IAccountData {
    id: number,
    user_name: string,
    bank_name: string,
    account_holder_name: string,
    branch_name: string,
    account_number: number,
    balance: number;
    ifsc_code: string,
    user_id: number,
    account_type: string,
    swift_code: string
}

export interface IAccountParams {
    id?: number,
    userId: number,
    bankName: string,
    accountHolderName: string,
    branchName: string,
    accountNumber: number,
    ifscCode: string,
    balance: number;
    accountType: string,
    swiftCode: string
}

