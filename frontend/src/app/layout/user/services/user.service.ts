import { CommonService } from './../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams } from 'src/app/models/table';
import { IUserParams } from 'src/app/models/user';
import { RestService } from 'src/app/shared/services';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class UserService {
    private url = 'api/user';
    private removeUrl = 'api/user/remove';


    constructor(
        private restService: RestService,
        private commonService: CommonService
    ) { }

    public getUser(tablePrams: IMatTableParams) {
        const queryString = this.commonService.toQueryString(tablePrams);
        return this.restService.get<any>(`${this.url}${queryString}`);
    }
    public addUser(user: IUserParams): Observable<any> {
        return this.restService.post(`${this.url}`, user);
    }
    public editUser(user: IUserParams) {
        return this.restService.put(`${this.url}`, user);
    }
    public removeUser(id: number) {
        return this.restService.put(`${this.removeUrl}/remove?id=${id}`);
    }
    public userDropDown() {
        return this.restService.get(`${this.url}/getUserDropDown`)
    }
}
