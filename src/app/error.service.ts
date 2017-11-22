import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class ErrorService {

    private errors: string[] = [];
    errorStream: Subject<string>;
  constructor(private messageService: MessageService) {
      this.errorStream = new Subject();
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.add(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  add(message: string) {
    this.errors.unshift(message);
    this.errorStream.next(message);
  }

  clearLatest () {
      this.errorStream.next();
  }
}
