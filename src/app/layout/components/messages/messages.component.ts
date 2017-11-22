import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../message.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    message: string;
    constructor(private messageService: MessageService) {
        this.messageService.messageStream.subscribe(x => {
            this.message = x;
        });
    }

    ngOnInit() {
    }

}
