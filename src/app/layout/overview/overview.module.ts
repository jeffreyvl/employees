import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { PageHeaderModule } from '../components/page-header/page-header.module';
import { UserService } from '../../user.service';
import { MessageService } from '../../message.service';
import { ErrorService } from '../../error.service';

@NgModule({
    imports: [
        CommonModule,
        OverviewRoutingModule,
        TranslateModule,
        PageHeaderModule
    ],
    declarations: [
        OverviewComponent
    ],
    providers: [UserService, MessageService, ErrorService]
})
export class OverviewModule {}
