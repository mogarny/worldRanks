import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues',
  standalone: true,
})
export class ObjectValuesPipe implements PipeTransform {
  transform(value: Record<string, any>): string {
    if (typeof Object.values(value)[0] === 'string') {
      return Object.values(value).join(', ');
    }

    return Object.values(value)
      .map((el) => `${el.name} ${el.symbol}`)
      .join(', ');
  }
}
