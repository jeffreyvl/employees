import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private messages: string[] = [];
    messageStream: Subject<string>;

    constructor() {
        this.messageStream = new Subject();
    }

    add(message: string) {
        this.messages.unshift(message);
        this.messageStream.next(message);
    }

    clear() {
        this.messages = [];
    }

    clearLatest() {
        this.messageStream.next();
    }
}
