
export interface IExpenseData {
    id: number,
    user_id: number,
    account_id: number,
    user_name: string,
    expense_type_id: number,
    expense_type: string,
    account_number: number,
    amount: number,
    payment_method: string,
    remark: string
}

export interface IExpenseParams {
    id?: number,
    userId: number,
    accountId: number,
    expenseTypeId: number,
    amount: number,
    paymentMethod: string,
    remark: string
}

export interface IExpenseTypeData {
    id: number,
    expense_type: string,

}

export interface IExpenseTypeParams {
    id?: number,
    expenseType: string,
}
