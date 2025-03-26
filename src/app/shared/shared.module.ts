import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldvalidationDirective } from './fieldvalidation.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FieldvalidationDirective,
    ],
    declarations: [
        FieldvalidationDirective,
    ]
})
export class SharedModule
{
}
