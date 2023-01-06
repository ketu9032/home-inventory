
export interface IBorrowData {
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

export interface IBorrowParams {
    id?: number,
    userId: number,
    accountId: number,
    expenseTypeId: number,
    amount: number,
    paymentMethod: string,
    remark: string
}

export interface IBorrowNameData {
    id: number,
    first_name: string,
    last_name: string,
    mobile_number: number,
    alternative_number: number,

}

export interface IBorrowNameParams {
    id?: number,
    firstName: string,
    lastName: string,
    mobileNumber: number,
    alternativeNumber: number,
}
