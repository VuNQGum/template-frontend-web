import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonApiService } from 'app/services/commonHttp';
import { TienichVPURL } from 'app/services/tienichvp/tienichVPURL';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nhansu',
  templateUrl: './nhansu.component.html',
  styleUrls: ['./nhansu.component.scss']
})
export class NhansuComponent implements OnInit {

  allNhansu: any;
  selected: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private http: CommonApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<NhansuComponent>) { }

  ngOnInit(): void {
    if (this.data) {
      this.allNhansu = this.data;
    } else {
      this.http.get(TienichVPURL.allNhansu()).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        this.allNhansu = res.data;
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
  }/**
          * On destroy
          */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
