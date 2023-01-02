
export interface IIncomeData {
    id: number,
    user_id: number,
    user_name: string,
    account_id: number,
    account_type: string,
    amount: number,
    payment_method: string,
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
export interface IIncomeTypeData {
    id: number,
    income_type: string,

}

export interface IIncomeTypeParams {
    id?: number,
    incomeType: string,
}
