import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { CommonURL } from 'app/services/commonURL';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private _navigation: ReplaySubject<FuseNavigationItem> = new ReplaySubject<FuseNavigationItem>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<FuseNavigationItem> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */

    get(): Observable<FuseNavigationItem> {
        return this._httpClient.get<FuseNavigationItem>(CommonURL.getMenu('HRMS')).pipe(
            tap((navigation: any) => {
                this._navigation.next(navigation.data);
            })
        );
    }

    // get(): Observable<Navigation>
    // {
    //     return this._httpClient.get<Navigation>('api/common/navigation').pipe(
    //         tap((navigation) => {
    //             this._navigation.next(navigation);
    //         })
    //     );
    // }
}
