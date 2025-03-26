import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { API } from 'app/core/config/app.config';
import { User } from 'app/core/user/user.types';
import { APP_ACTION } from 'app/ngxstore/actions/app.actions';
import { AppState } from 'app/ngxstore/state/app.state';
import { CommonApiService } from 'app/services/commonHttp';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  user$ = new BehaviorSubject<User>({});

  counterCT: any;
  counterNP: any;
  counterXNGDD: any;
  counterKYSOGDD: any;
  counterHDLD: any;
  xnGiaydd: boolean = false;

  constructor(private store: Store<AppState>, private http: CommonApiService) {
    const appUser = this.store.select((state) => state.appUser);
    appUser.subscribe((res: any) => {
      const data = res;
      if (data && data.type === APP_ACTION.USER_INFO) {
        let lgu: User = { ...data.payload }
        lgu.avatar = `${API.IMG}/${lgu.iddonvi}/${lgu.idnv}.png`;
        lgu.status = 'online';
        this.user$.next(lgu);
        const roleGiaydd = lgu.applications.find((item: any) => item.role === 'ROLE_XN_GIAYDD');
        if (roleGiaydd) {
          this.xnGiaydd = true;
        }
      }
    });
    localStorage.setItem("TIVP_FUNC_OPEND", "NONE");
  }

  ngOnInit(): void {

    // this.http
    //   .get(TienichVPURL.getCountAllTIVP())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((result) => {
    //     if (!result) return;
    //     this.counterCT = result.data.DKCT;
    //     this.counterNP = result.data.DKNP;
    //     this.counterKYSOGDD = result.data.GDD;
    //     this.counterHDLD = result.data.HDLD;
    //   });

    // if (this.xnGiaydd) {
    //   this.http
    //     .get(HubURL.getCountXacnhanGdd())
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((result) => {
    //       if (!result) return;
    //       this.counterXNGDD = result.data;
    //     });
    // }

  }
  /**
       * On destroy
       */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
