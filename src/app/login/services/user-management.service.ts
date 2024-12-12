import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { IUserRegister } from '../models/user-register';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  baseUrl = environment.baseUrl;
  httpClient = inject(HttpClient);

  getUser(user: IUserRegister): Observable<IUser> {
    const response = this.httpClient.post<IUser>(`${this.baseUrl}/users`, user);

    return response;
  }
}
