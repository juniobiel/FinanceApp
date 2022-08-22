import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { User } from '../models/User';

@Injectable()
export class AccountService extends BaseService
{
  constructor(private http : HttpClient)
  {
    super();
  }

  registerUser(user: User) : Observable<Object>
  {
    let response = this.http
      .post(this.UrlService + 'create-account', user, {
        headers: this.GetJsonHeader().headers,
        observe: 'body',
        responseType: 'text'
      })
      .pipe(catchError(this.serviceError));
    return response;
  }

  login(user: User)
  {
    let response = this.http
    .post(this.UrlService + 'sign-in', user, this.GetJsonHeader())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));
    return response;
  }
}