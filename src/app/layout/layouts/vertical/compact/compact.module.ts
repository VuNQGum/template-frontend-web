import { RadioButtonModule } from 'primeng/radiobutton';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseFullscreenModule } from '@fuse/components/fullscreen';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { SharedModule } from 'app/shared/shared.module';
import { CompactLayoutComponent } from 'app/layout/layouts/vertical/compact/compact.component';
import { ChooseappModule } from 'app/layout/common/chooseapp/chooseapp.module';
import { FuseAlertModule } from '@fuse/components/alert';
import { ModalsearchComponent } from './modalsearch/modalsearch.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { DropdownModule } from 'primeng/dropdown';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QuickChatModule } from 'app/layout/common/quick-chat/quick-chat.module';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { VN_DATE_FORMATS_SHORT } from 'app/core/config/vn-date-formats';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {EvnLibNotify2Module} from "evn-lib-notify";

@NgModule({
    declarations: [
        CompactLayoutComponent,
        ModalsearchComponent,
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseFullscreenModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        NotificationsModule,
        QuickChatModule,
        UserModule,
        SharedModule,
        FuseAlertModule,
        ChooseappModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MomentDateModule,
        Ng2SearchPipeModule,
        DropdownModule,
        AutoCompleteModule,
        MatSelectModule,
        MatRadioModule,
        RadioButtonModule,
        EvnLibNotify2Module
    ],
    exports     : [
        CompactLayoutComponent
    ],
    providers: [{ provide: MAT_DATE_FORMATS, useValue: VN_DATE_FORMATS_SHORT }],
})
export class CompactLayoutModule
{
}
