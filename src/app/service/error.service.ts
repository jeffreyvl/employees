import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class ErrorService {

  private errors: string[] = [];
  errorStream: Subject<string>;

  constructor() {
    this.errorStream = new Subject();
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.add(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  add(message: string) {
    this.errors.unshift(message);
    this.errorStream.next(message);
  }

  clear() {
    this.errorStream.next();
  }
}
