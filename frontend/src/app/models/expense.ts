
export interface IExpenseData {
    expenseId: number,
    user_id: number,
    account_id: number,
    user_name: string,
    account_number: number,
    to_user_id: number,
    toUserName: string,
    amount: number,
    payment_method: string,
    remark: string
}

export interface IExpenseParams {
    id?: number,
    userId: number,
    accountId: number,
    toUserId: number,
    amount: number,
    paymentMethod: string,
    remark: string
}
