import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorService } from '../../../service/error.service';

@Component({
    selector: 'app-errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

    error: string;
    constructor(private errorService: ErrorService) {
        this.errorService.errorStream.subscribe(x => this.error = x);
    }

    clear(): void {
        this.errorService.clear();
    }
    ngOnInit() {
    }

}
