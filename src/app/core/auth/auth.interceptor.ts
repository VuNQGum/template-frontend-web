import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthConfig, Environment } from '../config/app.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    /**
     * Constructor
     */
    constructor(private _authService: AuthService) {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone({
            headers: req.headers.set(
                'Authorization-type', 'Header'
            ),
            //withCredentials: true
        });
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.  && !AuthUtils.isTokenExpired(this._authService.accessToken

        if (this._authService.accessToken && !newReq.url.includes('/auth/')) {
            newReq = req.clone({
                headers: req.headers.set(
                    'Authorization-type', 'Header'
                ),
               //withCredentials: true
            });
            newReq = this.addTokenHeader(newReq, this._authService.accessToken);
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {

                // Catch "401 Unauthorized" responses
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(newReq, next);
                } else if (error instanceof HttpErrorResponse && error.status === 406) {
                    setTimeout(() => {
                        this._authService.signOut();
                    }, 1000);

                }
                return throwError(error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            //const REFRESH_TOKEN = this._authService.refreshToken;
            //if (REFRESH_TOKEN)
            return this._authService.signRefreshToken().pipe(
                switchMap((accessToken: any) => {
                    // if (accessToken) {
                    this.isRefreshing = false;
                    const token = this._authService.accessToken;
                    this.refreshTokenSubject.next(token);
                    return next.handle(this.addTokenHeader(request, token));
                }),
                catchError((err) => {
                    return throwError(err);
                })
            );
        }

        return this.refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) =>
                next.handle(this.addTokenHeader(request, token))
            )
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        /* for Spring Boot back-end */
        return request.clone({
            headers: request.headers.set(
                AuthConfig.TOKEN_HEADER_KEY,
                'Bearer ' + token,
                // 'Content-Type', 'application/json'
            ).set('Org-code', Environment.Org_code),
        });
    }

}
