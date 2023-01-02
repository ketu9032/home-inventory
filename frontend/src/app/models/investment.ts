
export interface IInvestmentData {
    id: number,
    user_id: number,
    user_name: string,
    account_id: number,
    account_type: string,
    amount: number,
    payment_method: string,
    remark: string
}

export interface IInvestmentParams {
    id?: number,
    userId: number,
    accountId: number,
    investmentId: number,
    amount: number,
    paymentMethod: string,
    remark: string
}
export interface IInvestmentTypeData {
    id: number,
    investment_type: string,

}

export interface IInvestmentTypeParams {
    id?: number,
    investmentType: string,
}
