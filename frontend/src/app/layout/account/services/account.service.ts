import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { RestService } from 'src/app/shared/services';
import { IAccountParams } from 'src/app/models/account';
import { IMatTableParams } from 'src/app/models/table';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private url = 'api/account';

    constructor(
        private restService: RestService,
        private commonService: CommonService
    ) { }

    public getAccount(tablePrams: IMatTableParams) {
         const queryString = this.commonService.toQueryString(tablePrams);
         return this.restService.get<any>(`${this.url}${queryString}`);

    }
    public addAccount(account: IAccountParams) {
        return this.restService.post(`${this.url}`, account);
    }
    public editAccount(account: IAccountParams) {
        return this.restService.put(`${this.url}`, account);
    }
    public removeAccount(id) {
        return this.restService.put(`${this.url}/remove?id=${id}`);
    }
    public getAccountUserWise(id) {
        return this.restService.get(`${this.url}/getAccountUserId`, id);
    }

}
