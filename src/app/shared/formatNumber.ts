import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    // Kiểm tra xem giá trị đầu vào có phải là số không
    if (value == null || isNaN(value)) {
      return '';
    }

    // Định dạng số theo dạng 1.000.000
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
