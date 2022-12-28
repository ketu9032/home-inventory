
export interface IIncomeData {
    id: number,
    user_id: number,
    user_name: string,
    account_id: number,
    account_type: string,
    amount: number,
    payment_Method: string,
    remark: string
}

export interface IIncomeParams {
    id?: number,
    userId: number,
    accountId: number,
    amount: number,
    paymentMethod: string,
    remark: string
}
