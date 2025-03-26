import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'e-upload',
  templateUrl: './e-upload.component.html',
  styleUrls: ['./e-upload.component.scss']
})
export class EUploadComponent implements OnInit {

  @Output() onSelected: EventEmitter<File>;
  @Input() file: any;
  @ViewChild('labelImport')
  labelImport: ElementRef;

  formImport: FormGroup;
  fileToUpload: File = null;


  constructor() {
    this.onSelected = new EventEmitter();
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }
  ngOnInit(): void {
  }

  onFileChange(files: FileList) {
    this.onSelected.emit(files.item(0));
    // this.labelImport.nativeElement.innerText = Array.from(files)
    //   .map(f => f.name)
    //   .join(', ');
    // this.fileToUpload = files.item(0);
    //this.labelImport.nativeElement.innerText = this.file.name;
  }

  // onClear(): void {
  //   this.fileToUpload = null;
  //   this.labelImport.nativeElement.innerText = '';
  // }

  import(): void {
    console.log('import ' + this.fileToUpload.name);
  }

}
