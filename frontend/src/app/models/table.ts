
export interface IMatTableParams {
    pageSize: number
    pageNumber: number;
    orderBy: string;
    direction: string;
    search: string;
    active: boolean;

}
export interface IMatTableParamsWithSearchParams {
    pageSize: number
    pageNumber: number;
    orderBy: string;
    direction: string;
    search: string;
    active: boolean;
    // fromUserId: number;
    // toUserId: number;
    // fromDate: string;
    // toDate: string;
    [key: string]: any;
}

export interface ISelectedDate {
    startDate: Date;
    endDate: Date;
}

