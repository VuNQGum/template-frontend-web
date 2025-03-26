import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonApiService } from 'app/services/commonHttp';
import { EmployeURL } from 'app/services/employe/employeURL';
import { AppUltil } from 'app/shared/AppUltil';
import { MessageService } from 'app/shared/message.services';
import FileSaver from 'file-saver';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-fileview',
    templateUrl: './fileview.component.html',
    styleUrls: ['./fileview.component.scss'],
})
export class FileviewComponent implements OnInit {
    fileBase64: any;
    filePreview: any;
    zoomSetting: any;
    can_view: boolean = true;
    is_Image: boolean = false;

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
        public matDialogRef: MatDialogRef<FileviewComponent>,
        private http: CommonApiService,
        private sanitizer: DomSanitizer,
        private messageService: MessageService
    ) {
        pdfDefaultOptions.renderInteractiveForms = false;
        if(data.zoomSetting){
            this.zoomSetting = data.zoomSetting;
        } else {
            this.zoomSetting = 'auto';
        }
    }
    ngOnInit(): void {
        if (!this.data) {
            return;
        }

        this.fileBase64 = this.data.fileContent;
        if (this.data && this.data.fileExten?.toUpperCase().includes('PDF')) {
            this.can_view = true;
            this.filePreview = AppUltil.base64ToBlob(this.fileBase64);
        } else if (
            this.checkImageFile(this.data.fileExten) ||
            this.checkImageFile(this.data?.mimeType)
        ) {
            this.is_Image = true;
            if (this.fileBase64.startsWith('data:image'))
                this.fileBase64 = this.fileBase64.split(',')[1];
            this.filePreview = this.sanitizer.bypassSecurityTrustResourceUrl(
                `data:image/png;base64, ${this.fileBase64}`
            );
        } else if (
            this.data.fileExten?.toUpperCase().includes('DOCX') ||
            this.data.fileExten?.toUpperCase().includes('DOC') ||
            this.data.fileExten?.toUpperCase().includes('XLS') ||
            this.data.fileExten?.toUpperCase().includes('XLSX')
        ) {
            this.http
                .post(EmployeURL.convertToPdf(), {
                    file: this.fileBase64,
                    name: this.data?.fileName,
                    fileExtend: this.data?.fileExten.toUpperCase()
                })
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((res: any) => {
                    if (!res || !res.state) {
                        return;
                    }
                    this.can_view = true;
                    this.is_Image = false;
                    this.filePreview = AppUltil.base64ToBlob(res.data);
                });
        } else {
            this.messageService.showWarningMessage(
                'Hệ thống',
                'Không hỗ trợ preview, vui lòng tải file!'
            );
            this.can_view = false;
        }
    }

    saveAndClose(): void {
        this.matDialogRef.close();
    }

    close(): void {
        this.matDialogRef.close();
    }

    downloadAttachmentFile() {
        const blob = AppUltil.base64ToBlob(this.fileBase64);
        FileSaver.saveAs(blob, this.data.fileName);
    }

    checkImageFile(fileExtend) {
        if (!fileExtend)
            return false;
        if (
            fileExtend.toLowerCase().includes('jpg') ||
            fileExtend.toLowerCase().includes('jpeg') ||
            fileExtend.toLowerCase().includes('png') ||
            fileExtend.toLowerCase().includes('gif')
        )
            return true;
        else return false;
    }
}
