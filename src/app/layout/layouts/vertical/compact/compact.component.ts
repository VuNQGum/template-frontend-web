import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ShareData } from 'app/shared/shareservice.service';
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationItem,
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { TitleHead } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { SEARCH } from 'app/shared/appkeymessages';
import { MatDialog } from '@angular/material/dialog';
import { ModalsearchComponent } from './modalsearch/modalsearch.component';
import { MessageKey } from 'app/shared/AppUltil';
import { API, Environment } from 'app/core/config/app.config';
import { FuseAlertService } from '@fuse/components/alert';
import { Store } from '@ngrx/store';
import { APP_ACTION } from 'app/ngxstore/actions/app.actions';
import { AppState } from 'app/ngxstore/state/app.state';
import { User } from 'app/core/user/user.types';
import { CommonApiService } from 'app/services/commonHttp';

@Component({
    selector: 'compact-layout',
    templateUrl: './compact.component.html',
    styleUrls: ['./compact.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CompactLayoutComponent implements OnInit, OnDestroy {
    warnZone: boolean = false;
    isScreenSmall: boolean;
    navigation: FuseNavigationItem;
    homeURL = window.location.origin;

    typeAlert: string;
    titleAlert: string;
    contentAlert: string;
    showError: boolean = false;
    title$: Observable<TitleHead>;
    is_search: boolean = false;
    is_filter: boolean = false;
    textValue: string = '';
    searchData: any;

    // Current user
    user_info: User;
    user$ = new BehaviorSubject<User>({});
    donvi: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private shareData: ShareData,
        private _fuseAlertService: FuseAlertService,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _matDialog: MatDialog,
        private store: Store<AppState>,
        private http: CommonApiService
    ) {
        const offset = new Date().getTimezoneOffset();
        const timeZone = -(offset / 60);
        if (timeZone !== 7) {
            this.warnZone = true;
        }
        const title: TitleHead = {
            title: 'Dashboard',
            subTitle: null,
            search: false,
        };
        this.title$ = of(title);

        const appUser = this.store.select((state) => state.appUser);
        appUser.subscribe((res: any) => {
            const data = res;
            if (data && data.type === APP_ACTION.USER_INFO) {
                this.user_info = { ...data.payload };
                this.user_info.avatar = `${API.IMG}/${this.user_info.iddonvi}/${this.user_info.idnv}.png`;
                this.user_info.status = 'online';
                this.user$.next(this.user_info);

                // Lấy tên đơn vị
                // this.http
                //     .get(HSNhansuURL.getDsDonviTructhuoc(this.user_info.iddonvi))
                //     .pipe(takeUntil(this._unsubscribeAll))
                //     .subscribe((res: any) => {
                //         if (!res || !res.state) return;
                //         this.donvi = res.data[0];
                //     });
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }
    handleNotify(messageT: String) {
        console.log(messageT);

        let alert = {
            type: 'info',
            title: 'Bạn có thông báo mới',
            message: '' + messageT,
        };
        this.shareData.sendMessage('alert', alert);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.shareData
            .getMessage(MessageKey.FN_HEADER_NAME)
            .subscribe((header: TitleHead) => {
                this.title$ = of(header);
                this.is_search = header.search;
                if (header.filter && Environment.KyHDLD_TheoLo) {
                    this.is_filter = true;
                }
            });
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: FuseNavigationItem) => {
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

        //AlertBox
        this.shareData.getMessage('alert').subscribe((alertMess) => {
            if (alertMess) {
                this.showError = true;
                this.typeAlert = alertMess.type;
                this.titleAlert = alertMess.title;
                this.contentAlert = alertMess.message;
                //show alert
                this._fuseAlertService.show('alertBox');
                setTimeout(() => {
                    this.showError = false;
                    this._fuseAlertService.dismiss('alertBox');
                }, 4000);
            }
        });
        // Subscribe to data for search
        this.shareData.getMessage(SEARCH.SEARCH_DATA).subscribe((data) => {
            this.searchData = data;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onChangeText(textValue: string): void {
        this.textValue = textValue;
        this.shareData.sendMessage(SEARCH.SEARCH_HEAD, {
            client: true,
            type: SEARCH.SEARCH_ADS,
            data: textValue,
        });
        //console.log('AAAAAA:', textValue);
    }

    onAdSeach(): void {
        const fn_view = localStorage.getItem('TIVP_FUNC_OPEND');
        if (fn_view != null && fn_view !== 'NONE') {
            // Open the dialog
            // Bổ sung thêm kiểm tra các chức năng đang được mở để show các tìm kiếm nâng cao  tương ứng
            const fn_view_open = localStorage.getItem('VIEW_OPEN_SEARCH_AD');
            if (fn_view_open === 'TK_DUYET_LLBS') {
                // const dialogRef = this._matDialog.open(
                //     FilterxacnhanllbsComponent,
                //     { disableClose: true }
                // );

                // dialogRef.afterClosed().subscribe((result) => {});
            } else {
                // const dialogRef = this._matDialog.open(ModalsearchComponent, { disableClose: true });
                // //const dialogRef = this._matDialog.open(MailboxComposeComponent);
                // dialogRef.afterClosed()
                //     .subscribe((result) => {
                //         //console.log('CompactLayoutComponent: Compose dialog was closed!', result);
                //     });
            }
        }
    }

    onSearchServer(): void {
        this.shareData.sendMessage(SEARCH.SEARCH_HEAD, {
            client: true,
            type: SEARCH.SEARCH_ADS,
            data: this.textValue,
        });
    }

    onClear(): void {
        this.textValue = '';
        this.shareData.sendMessage(SEARCH.SEARCH_HEAD, {
            client: true,
            type: SEARCH.SEARCH_ADS,
            data: this.textValue,
        });
    }
    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
