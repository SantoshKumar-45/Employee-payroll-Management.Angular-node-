import { Pipe, PipeTransform } from '@angular/core';
import { ToWords } from 'to-words';
@Pipe({
  name: 'numberTowords'
})

export class NumberTowordsPipe implements PipeTransform {
  toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: { // can be used to override defaults for the selected locale
        name: 'Rupee',
        plural: 'Rupees',
        symbol: '₹',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: '',
        },
      }
    }
  });

  transform(value: number, ...args: unknown[]): string {

    let words = '';

    words = this.toWords.convert(value)

    // Trimming any leading/trailing whitespace and returning the final words
    return words.trim();
  }


};


