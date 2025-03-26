import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[inputNumberFormat]'
})
export class NumberFormatDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Xử lý định dạng số
    const formattedValue = this.formatNumber(value);
    // Cập nhật giá trị đã định dạng vào input
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
  }

  formatNumber(value: string): string {
    // Xóa tất cả các ký tự không phải số
    const number = value.replace(/\D/g, '');
    // Định dạng số theo định dạng 1.000.000
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}