
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
import { ChooseappComponent } from './chooseapp.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ChooseappComponent
  ],
  imports: [
    RouterModule.forChild([]),
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SharedModule,
    //BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  exports: [
    ChooseappComponent
  ], providers: [
    {
      provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
      useFactory: (overlay: Overlay) => (): BlockScrollStrategy => overlay.scrollStrategies.block(),
      deps: [Overlay]
    }
  ]
})
export class ChooseappModule { }



