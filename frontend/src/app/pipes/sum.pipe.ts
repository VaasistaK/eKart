import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(value: any[], propertyToAdd: any): number {
    return value.reduce((a, b) => a + Number.parseInt(b[propertyToAdd]), 0);
  }

}
