import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonApiService } from 'app/services/commonHttp';
import { EmployeURL } from 'app/services/employe/employeURL';
import { AppUltil } from 'app/shared/AppUltil';
import FileSaver from 'file-saver';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-fileviewmulpdf',
    templateUrl: './fileviewmulpdf.component.html',
    styleUrls: ['./fileviewmulpdf.component.scss']
})
export class FileviewmulpdfComponent {
    fileBase64: any;
    filePreview: any;
    can_view: boolean = true;
    is_Image: boolean = false;
    src: string = '../assets/filemau/HD_cau_hinh_file_mau.pdf';

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /*
        data: {
            fileContent: string, base64
            fileExten: string,
            fileName: string,
            mimeType?: string
        },
    */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<FileviewmulpdfComponent>,
        private http: CommonApiService,
        private sanitizer: DomSanitizer
    ) {
        pdfDefaultOptions.renderInteractiveForms = false;
    }
    
    ngOnInit(): void {
        if (!this.data || !this.data.fileContent) {
            return;
        }

        this.filePreview = this.data.fileContent
    }

    saveAndClose(): void {
        this.matDialogRef.close();
    }

    close(): void {
        this.matDialogRef.close();
    }
}
