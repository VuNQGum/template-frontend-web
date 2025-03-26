import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonApiService } from 'app/services/commonHttp';
import { TienichVPURL } from 'app/services/tienichvp/tienichVPURL';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-donvi',
  templateUrl: './donvi.component.html',
  styleUrls: ['./donvi.component.scss']
})
export class DonviComponent implements OnInit {

  allDonvi: any;
  selected: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private http: CommonApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DonviComponent>) { }



  ngOnInit(): void {
    if (this.data) {
      this.allDonvi = this.data;
    } else {
      this.http.get(TienichVPURL.allDonvi()).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        this.allDonvi = res.data;
      });
    }
  }

  onRowSelect(event, selected) {
    this.selected = selected;
    this.matDialogRef.close(selected);
  }
  /**
        * Save and close
        */
  saveAndClose(): void {
    // Close the dialog
    this.matDialogRef.close();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
