export interface ITransferData {

    id:number,
    user_id: number,
    to_user_id: number,
    account_id: number,
    to_user_account_id: number,
    amount: number,
    remark: string,
    payment_method: string,
    user_name: string,
    isActive: boolean,
}
export interface ITransferParams {
    id?: number,
    userId:number,
    accountId: number,
    toUserId: number,
    toUserAccountId: number,
    remark: string,
    amount: number,
    paymentMethod: string
}
export interface ITransferActiveParams {
    transferId: number, status: boolean
}
