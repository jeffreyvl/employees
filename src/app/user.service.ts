import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from './user';
import { UserList } from './user-list';
import { ErrorService } from './error.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private url = 'https://reqres.in/api/'; // URL to web api

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getUsers(i: number): Observable<UserList> {
      const api = `${this.url}users?page=${i}`;

        if (i === undefined) {
            i = 1;
        }

    return this.http
      .get<UserList>(api)
      .pipe(
        tap(users => {
            console.log('Fetched Users');
        }),
        catchError(this.errorService.handleError('getUsers', new UserList()))
      );
  }

  delUser(id: number): Observable<User> {
    const api = `${this.url}users/${id}`;

    return this.http.delete<User>(api, httpOptions).pipe(
        tap(_ => this.log(`deleted user id=${id}`)),
        catchError(this.errorService.handleError<User>('delUser'))
    );
  }

  log(message: string): void {
      this.messageService.add(message);
  }
}
