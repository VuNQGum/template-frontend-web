import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EUploadComponent } from './e-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EUploadComponent
  ]
})
export class EUploadModule { }
