
export interface IExpenseData {
    expenseId: number,
    userId: number,
    userName: string,
    accountNumber: number,
    toUserId: number,
    toUserName: string,
    amount: number,
    paymentMethod: string,
    remark: string
}

export interface IExpenseParams {
    id?: number,
    userId: number,
    accountNumber: number,
    toUserId: number,
    amount: number,
    paymentMethod: string,
    remark: string
}
