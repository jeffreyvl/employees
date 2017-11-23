import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../model/user';
import { Response } from '../model/response';
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

  getUsers(i: number, perPage: number): Observable<Response> {

    const api = `${this.url}users?page=${i}&per_page=${perPage}`;

    if (i === undefined) {
      i = 1;
    }

    return this.http.get<any>(api).pipe(
      map(body => this.mapToResponse(body)),
      tap(_ => {
        console.log('Fetched Users');
      }),
      catchError(this.errorService.handleError('getUsers', new Response()))
    );
  }

  mapToResponse(body): Response {
      const users: User[] = new Array();
      for (const user of body.data) {
        users.push(this.mapToUser(user));
      }
      return new Response(body.page, body.per_page, body.total, body.total_pages, users);
  }

  getUser(id: number): Observable<User> {

    const api = `${this.url}users/${id}`;

    return this.http
      .get<any>(api)
      .pipe(
        map(body => this.mapToUser(body.data)),
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.errorService.handleError<User>(`getUser id=${id}`))
      );
  }

  mapToUser(body): User {
    return new User(body.avatar, body.first_name, body.last_name, body.id, body.createdAt, body.UpdatedAt);
  }

  addUser(user: User): Observable<User> {

    const api = `${this.url}users`;

    return this.http
      .post<any>(api, user, httpOptions)
      .pipe(
        tap(() => this.log(`added user`)),
        catchError(this.errorService.handleError<User>(`addUser`))
      );
  }

  editUser(user: User): Observable<User> {

       const api = `${this.url}users/${user.id}`;

    return this.http
      .put<any>(api, user, httpOptions)
      .pipe(
        tap(() => this.log(`updated user`)),
        catchError(this.errorService.handleError<User>(`editUser`))
      );
  }

  delUser(id: number): Observable<User> {

    const api = `${this.url}users/${id}`;

    return this.http
      .delete<User>(api, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted user id=${id}`)),
        catchError(this.errorService.handleError<User>('delUser'))
      );
  }

  log(message: string): void {
    this.messageService.add(message);
  }
}
