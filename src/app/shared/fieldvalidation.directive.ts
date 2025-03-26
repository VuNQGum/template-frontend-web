import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appFieldvalidation]',
})
export class FieldvalidationDirective implements AfterViewInit{

    constructor(private eRef: ElementRef, private renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        const dropdownTagsValidation = this.eRef.nativeElement.querySelectorAll('p-dropdown.validation');
        dropdownTagsValidation.forEach((paragraph) => {
            paragraph.addEventListener('focusout', event => {
                if (event.target.value || event.target.value != null) {
                    paragraph.classList.remove('ng-dirty');
                    paragraph.classList.remove('ng-invalid');
                }
            })
        })
    }

    ngOnInit() {

    }

    @HostListener('submit')
    onCommit() {
        const dropdownTags = this.eRef.nativeElement.querySelectorAll('p-dropdown[required]');

        dropdownTags.forEach((paragraph) => {
          if (!paragraph.value || paragraph.value == null || paragraph.value == '') {
            paragraph.classList.add('ng-dirty');
          }
        });

        const dropdownTagsValidation = this.eRef.nativeElement.querySelectorAll('p-dropdown.validation');

        dropdownTagsValidation.forEach((paragraph) => {
          if (!paragraph.value || paragraph.value == null || paragraph.value == '') {
            paragraph.classList.add('ng-dirty');
            paragraph.classList.add('ng-invalid');
          }
        });
    }

}
