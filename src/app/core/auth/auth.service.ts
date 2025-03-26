import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CookieService } from 'ngx-cookie-service';
import { API, AuthConfig, Environment } from '../config/app.config';
import { CommonURL } from 'app/services/commonURL';
import { Store } from '@ngrx/store';
import { AppState } from 'app/ngxstore/state/app.state';
import { APP_ACTION } from 'app/ngxstore/actions/app.actions';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _cookie: CookieService,
        private deviceService: DeviceDetectorService,
        private store: Store<AppState>
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        this._cookie.set(AuthConfig.ACCESS_TOKEN, token, 20, '/', '', false, "Lax");
    }

    get accessToken(): string {
        return this._cookie.get(AuthConfig.ACCESS_TOKEN) ?? '';
    }


    /**
     * Setter & getter for refresh Token
     */
    set refreshToken(token: string) {
        this._cookie.set(AuthConfig.REFRESH_TOKEN, token, 20, '/', '', false, "Lax");
    }

    get refreshToken(): string {
        return this._cookie.get(AuthConfig.REFRESH_TOKEN) ?? '';
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        const deviceID =
            localStorage.getItem(AuthConfig.DEVICE_ID) || AuthUtils.guid();
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        // Thông tin thiết bị đăng nhập
        const deviceInfo = this.deviceService.getDeviceInfo();
        let dataSign = {
            username: `${credentials.email}`,
            password: `${credentials.password}`,
            expiration: Environment.expiration,
            deviceInfo: {
                deviceId: deviceID,
                deviceType: `${deviceInfo.os}/${deviceInfo.os_version}/${deviceInfo.deviceType}/${deviceInfo.browser}`,
                appId: Environment.appId,
                appVersion: Environment.appVersion,
            },
        };

        return this._httpClient.post(CommonURL.login(), dataSign).pipe(
            switchMap((response: any) => {

                const data = response.data;
                this.accessToken = response.data.accessToken;
                // Store therefresh Token in the local storage
                this.refreshToken = response.data.refreshToken;
                // Set the authenticated flag to true
                this._authenticated = true;
                data.username = credentials.email;
                //data.accessToken = null;
                //data.refreshToken = null;
                //
                localStorage.setItem(AuthConfig.DEVICE_ID, deviceID);
                // Store the user on the user service
                // localStorage.setItem(
                //     AuthConfig.USER_INFOR,
                //     JSON.stringify(data)
                // );

                let evnidData = data;

                this.store.dispatch({
                    type: APP_ACTION.USER_INFO,
                    payload: evnidData,
                });
                //data.userName =`${credentials.username}`
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * sign Refresh Token
     */
    signRefreshToken(): Observable<any> {
        const deviceID =
            localStorage.getItem(AuthConfig.DEVICE_ID) || AuthUtils.guid();
        return this._httpClient
            .post(CommonURL.refreshToken(), {
                deviceId: deviceID,
                expiration: Environment.expiration,
                refreshToken: `${this.refreshToken}`,
            })
            .pipe(
                catchError((eror) => {
                    // Return false
                    //     this.isRefreshing = false;
                    this.signOut();
                    location.reload();
                    return of(false);
                }),
                switchMap((response: any) => {
                    if (response === false) {
                        //this.signOut();
                        //location.reload();
                        return of(false);
                    } else {
                        this.accessToken = response.data.accessToken;
                        // Store therefresh Token in the local storage
                        this.refreshToken = response.data.refreshToken;
                        // Set the authenticated flag to true
                        this._authenticated = true;
                        // Store the user on the user service
                        //this._userService.user = response.user;
                        localStorage.setItem(AuthConfig.DEVICE_ID, deviceID);
                        // Lấy lại mới thông tin người dùng
                        // Return true
                        return of(response.data.accessToken);
                    }
                })
            );
    }


    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        this._authenticated = true;
        return this._httpClient
            .get(CommonURL.inforMe())
            .pipe(
                catchError((eror) => {
                    return of(false);
                }),
                switchMap(async (response: any) => {
                    let evnidData = response.data;
                    this.store.dispatch({
                        type: APP_ACTION.USER_INFO,
                        payload: evnidData,
                    });
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {

        const deviceID = localStorage.getItem(AuthConfig.DEVICE_ID);
        this._httpClient
            .post(CommonURL.logout(), {
                deviceInfo: {
                    appId: Environment.appId,
                    deviceId: deviceID,
                },
            })
            .subscribe((res) => {
                //console.log(res);
            });

        this._cookie.deleteAll('/');
        this._cookie.delete(AuthConfig.ACCESS_TOKEN, '/', API.ORG_DOMAIN, true, 'Lax');
        this._cookie.delete(AuthConfig.REFRESH_TOKEN, '/', API.ORG_DOMAIN, true, 'Lax');
        this._cookie.delete('__Secure-PSID', '/', API.ORG_DOMAIN, true, 'Lax');
        localStorage.removeItem(AuthConfig.ACCESS_TOKEN);
        // Remove the access token from the local storage
        localStorage.removeItem(AuthConfig.REFRESH_TOKEN);
        localStorage.removeItem(AuthConfig.USER_INFOR);
        // REmote DOFFICE
        this._cookie.delete('accessToken', '/');
        this._cookie.delete('refreshToken', '/');
        this._cookie.delete('accessToken_hub', '/');
        localStorage.removeItem('ISAD');
        localStorage.removeItem('ID_PBCurrent');
        localStorage.removeItem('DM_PHONG_BANCurrent');
        localStorage.removeItem('DOFFICE_MENU');
        localStorage.removeItem('USER_INFORMATION');
        localStorage.removeItem('DM_PHONG_BAN');
        localStorage.removeItem('MenuPhongBan');
        localStorage.removeItem('RouterLink');
        localStorage.removeItem('user');
        this._cookie.deleteAll();
        // Set the authenticated flag to false
        this._authenticated = false;
        window.location.href = window.location.origin;
        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            this.signRefreshToken();
            //return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
