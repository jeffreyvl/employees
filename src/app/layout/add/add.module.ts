import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { TranslateModule } from '@ngx-translate/core';
import { AddRoutingModule } from './add-routing.module';
import { PageHeaderModule } from '../components/page-header/page-header.module';

@NgModule({
    imports: [
        CommonModule,
        AddRoutingModule,
        TranslateModule,
        PageHeaderModule
    ],
    declarations: [
        AddComponent
    ]
})
export class AddModule {}
