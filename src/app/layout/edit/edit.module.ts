import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { EditRoutingModule } from './edit-routing.module';
import { PageHeaderModule } from '../components/page-header/page-header.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    EditRoutingModule,
    PageHeaderModule,
    TranslateModule,
    FormsModule
  ],
  declarations: [
    EditComponent
  ]
})
export class EditModule {}
