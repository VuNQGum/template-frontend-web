import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './shared/loading-component/interceptors/loader-interceptor.service';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material/progress-spinner';
import { LoadingService } from './shared/loading-component/loading-component.services';
// import { PromptUpdateService } from './core/promptUpdate/prompt-update.service';
// import { HandleUnrecoverableStateService } from './core/promptUpdate/handle-unrecoverable-state.service';
import { appReducer, userReducer } from './ngxstore/reducer/app.reducer';
import { StoreModule } from '@ngrx/store';
import { PushNotifications } from './layout/common/notifications/PushNotifications';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoadingComponent } from './shared/loading-component/loading-component.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { VN_DATE_FORMATS_EDIT } from './core/config/vn-date-formats';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { QuillConfigModule } from 'ngx-quill';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        //FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        StoreModule.forRoot({ appInfor: appReducer, appUser: userReducer }),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
        MatNativeDateModule,
        MatMomentDateModule,
        QuillConfigModule.forRoot({
            modules: {
              syntax: false,
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                ['blockquote', 'code-block'],
                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                [{ direction: 'rtl' }], // text direction
                [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                // [{ font: [] }],
                [{ align: [] }],
                ['clean'], // remove formatting button
                ['link', 'image', 'video'], // link and image, video
            ]
            }
          })
    ],
    providers: [
        // PromptUpdateService,
        // HandleUnrecoverableStateService,
        LoadingService,
        PushNotifications,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
        {
            provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
            useValue: {
                _forceAnimations: true
            }
        },
        { provide: MAT_DATE_FORMATS, useValue: VN_DATE_FORMATS_EDIT },
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
