import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/core/user/user.types';
import { APP_ACTION } from 'app/ngxstore/actions/app.actions';
import { AppState } from 'app/ngxstore/state/app.state';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'chooseapp',
  templateUrl: './chooseapp.component.html',
  styleUrls: ['./chooseapp.component.scss']
})
export class ChooseappComponent implements OnInit, OnDestroy {

  opened: boolean = false;
  user = new BehaviorSubject<User>({});
  //applications: any;
  constructor(private store: Store<AppState>) {
    const appUser = this.store.select((state) => state.appUser);
    appUser.subscribe((res: any) => {
      const data = res;
      if (data && data.type === APP_ACTION.USER_INFO) {
        let lgu: User = data.payload
        this.user.next(lgu);
        //this.applications = this.user$.value.applications;
      }
    });
  }


  ngOnInit(): void {
  }
  /**
       * Open the search
       * Used in 'bar'
       */
  open(): void {
    // Return if it's already opened
    if (this.opened) {
      return;
    }

    // Open the search
    this.opened = true;
  }

  /**
   * Close the search
   * * Used in 'bar'
   */
  close(): void {
    // Return if it's already closed
    if (!this.opened) {
      return;
    }

    // Close the search
    this.opened = false;
  }

  ngOnDestroy(): void {
   // this.user.unsubscribe();
  }
}
