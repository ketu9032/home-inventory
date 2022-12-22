
export interface IIncomeData {
    expenseId: number,
    userId: number,
    userName: string,
    accountNumber: number,
    amount: number,
    paymentMethod: string,
    remark: string
}

export interface IIncomeParams {
    id?: number,
    userId: number,
    accountNumber: number,
    amount: number,
    paymentMethod: string,
    remark: string
}
