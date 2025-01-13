import { signal } from '@angular/core';
import { buttons } from '@app/components/map/buttons.interface';

export class Buttons {
  public interfaceButtons = signal<buttons[]>([
    {
      value: '1',
      classList: `calcButton num1 `,
      highlighted: '',
    },
    {
      value: '2',
      classList: `calcButton num2 `,
      highlighted: '',
    },
    {
      value: '3',
      classList: `calcButton num3 `,
      highlighted: '',
    },
    {
      value: '4',
      classList: `calcButton num4 `,
      highlighted: '',
    },
    {
      value: '5',
      classList: `calcButton num5 `,
      highlighted: '',
    },
    {
      value: '6',
      classList: `calcButton num6 `,
      highlighted: '',
    },
    {
      value: '7',
      classList: `calcButton num7 `,
      highlighted: '',
    },
    {
      value: '8',
      classList: `calcButton num8 `,
      highlighted: '',
    },
    {
      value: '9',
      classList: `calcButton num9 `,
      highlighted: '',
    },
    {
      value: 'C',
      classList: `calcButton numC `,
      highlighted: '',
    },
    {
      value: '<',
      classList: `calcButton numSlice `,
      highlighted: '',
    },
    {
      value: '+',
      classList: `calcButton numMore `,
      highlighted: '',
    },
    {
      value: '-',
      classList: `calcButton numMinus `,
      highlighted: '',
    },
    {
      value: '/',
      classList: `calcButton numDiv `,
      highlighted: '',
    },
    {
      value: '*',
      classList: `calcButton numMult `,
      highlighted: '',
    },
    {
      value: '.',
      classList: `calcButton numDot `,
      highlighted: '',
    },
    {
      value: '0',
      classList: `calcButton num0 `,
      highlighted: '',
    },
    {
      value: '=',
      classList: `calcButton numEquals `,
      highlighted: '',
    },
  ]);
}
