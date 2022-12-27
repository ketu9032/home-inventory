import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams } from 'src/app/models/table';
import { IUserActiveParams, IUserName, IUserParams } from 'src/app/models/user';
import { RestService } from 'src/app/shared/services';
import { IAccountParams } from 'src/app/models/account';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private url = 'api/account';

    constructor(
        private restService: RestService,
        private commonService: CommonService
    ) { }

    public getAccount() {
        //  const queryString = this.commonService.toQueryString(tablePrams);
        //  return this.restService.get<any>(`${this.url}${queryString}`);
        return this.restService.get(`${this.url}`);
    }
    public addAccount(account: IAccountParams) {
        return this.restService.post(`${this.url}`, account);
    }
    public editAccount(account: IAccountParams) {
        return this.restService.put(`${this.url}`, account);
    }
    public removeAccount(id: string) {
        return this.restService.delete(`${this.url}/remove?id=${id}`);
    }
    public getAccountUserWise(id) {
        return this.restService.get(`${this.url}/getAccountUserId`, id);
    }

}
