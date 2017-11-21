import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    animations: [routerTransition()]
})
export class OverviewComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {}

}
