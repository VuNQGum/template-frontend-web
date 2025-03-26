import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropimageComponent } from './cropimage.component';
import { ImageviewModule } from '../imageview/imageview.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ImageModule } from 'primeng/image';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    CropimageComponent
  ],
  imports: [
    CommonModule,
    ImageviewModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule,
    ImageModule,
    ImageCropperModule
  ],
  exports: [
    CropimageComponent
  ]
})
export class CropimageModule { }
