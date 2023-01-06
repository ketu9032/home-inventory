export interface IBorrowData {
    id: number,
    user_id: number,
    account_id: number,
    user_name: string,
    account_number: number,
    borrow_name_id: number,
    amount: number,
    payment_method: string,
    remark: string
    ref_name: string
    return_date: string
}
export interface IBorrowParams {
    id?: number,
    userId: number,
    accountId: number,
    borrowNameId: number,
    amount: number,
    paymentMethod: string,
    refName: string;
    returnDate: string;
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
