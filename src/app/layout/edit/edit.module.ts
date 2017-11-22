import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { EditRoutingModule } from './edit-routing.module';
import { UserService } from '../../user.service';
import { MessageService } from '../../message.service';
import { ErrorService } from '../../error.service';
import { PageHeaderModule } from '../components/page-header/page-header.module';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  imports: [
    CommonModule,
    EditRoutingModule,
    PageHeaderModule,
    FormsModule
  ],
  declarations: [
    EditComponent
  ],
  providers:[ UserService, MessageService, ErrorService ]
})
export class EditModule {}
