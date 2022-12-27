export interface ITransferData {
    transferId: number, toUserId: number, description: string, transfer_amount: number, isDeleted: boolean, toUserName: string, fromUserId: number, fromUserName: string, isApproved: boolean, isActive: boolean
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
