import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonApiService } from 'app/services/commonHttp';
import { SEARCH } from 'app/shared/appkeymessages';
import { ShareData } from 'app/shared/shareservice.service';
import { ModelSearch } from './model.search';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modalsearch',
  templateUrl: './modalsearch.component.html',
  styleUrls: ['./modalsearch.component.scss']
})
export class ModalsearchComponent implements OnInit {
  dataRSNP: any[];
  modelSearch: ModelSearch;
  listPhongbans: any[];
  listNhansu: any[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(public matDialogRef: MatDialogRef<ModalsearchComponent>,
    private shareData: ShareData, private http: CommonApiService) {
    this.modelSearch = {
      tukhoa: null,
      tungay: null,
      denngay: null,
      nguoidangky: null,
      nguoiky: null,
      phongban: null,
      chuaxuly: false,
      daxuly: false,
      tralai: false,
    };

    // this.http.get(TienichVPURL.allPhongban()).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
    //   this.listPhongbans = res.data;
    // });

    // this.http.get(TienichVPURL.allNhansu()).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
    //   this.listNhansu = res.data;
    // });
  }

  ngOnInit(): void {
    // Create the form

  }

  onSearchServer(): void {
    this.shareData.sendMessage(SEARCH.SEARCH_HEAD, { client: false, type: SEARCH.SEARCH_ADS, data: this.modelSearch });
    this.matDialogRef.close();
  }
  /**
    Save and close
  */
  saveAndClose(): void {
    // Close the dialog
    this.matDialogRef.close();
  }

}
