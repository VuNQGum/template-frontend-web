import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/ngxstore/state/app.state';
import { APP_ACTION } from 'app/ngxstore/actions/app.actions';
import { API, AuthConfig } from 'app/core/config/app.config';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'
})
export class UserComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user$ = new BehaviorSubject<User>({});

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _authService: AuthService,
        private store: Store<AppState>,
        private _cookie: CookieService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        const appUser = this.store.select((state) => state.appUser);
        appUser.subscribe((res: any) => {
            const data = res;
            if (data && data.type === APP_ACTION.USER_INFO) {
                let lgu: User = { ...data.payload }
                lgu.avatar = `${API.IMG}/${lgu.iddonvi}/${lgu.idnv}.png`;
                lgu.status = 'online';
                this.user$.next(lgu);
                //console.log('lgu fsadf dsafdsaf dsf:', lgu);
                //this.appUser = this.user.value;
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void
    {
         // Return if user is not available
         if (!this.user$) {
            return;
        }
        this.user$.value.status = status;
    }

    /**
     * Sign out
     */
    signOut(): void
    {
        // Sign out
        this._authService.signOut();
        this._cookie.delete(AuthConfig.ACCESS_TOKEN, '/', API.ORG_DOMAIN, true, 'Lax');
        this._cookie.delete(AuthConfig.REFRESH_TOKEN, '/', API.ORG_DOMAIN, true, 'Lax');
        this._cookie.delete('__Secure-PSID', '/', API.ORG_DOMAIN, true, 'Lax');
        this._router.navigate(['/sign-in']);
    }
}
