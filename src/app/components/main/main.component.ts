import { Component } from '@angular/core';
import { Buttons } from '../map/config';
import { Service } from '@app/service.service';

@Component({
  selector: 'app-main-component',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent extends Buttons {
  constructor(private service: Service) {
    super();
  }

  protected readonly operators: string[] = ['+', '-', '*', '/'];
  protected dotLimit: number = 1;
  protected dotAmountOnString: number = 0;

  protected manageDot(
    prop: '+limit' | '+amount' | 'restart' | '-limit' | '-amount'
  ): void {
    if (prop === '+limit') {
      this.dotLimit++;
      return;
    }
    if (prop === '+amount') {
      this.dotAmountOnString++;
      return;
    }
    if (prop === 'restart') {
      this.dotLimit = 1;
      this.dotAmountOnString = 0;
      return;
    }
    if (prop === '-limit') {
      this.dotLimit--;
      return;
    }
    if (prop === '-amount') {
      this.dotAmountOnString--;
    }
  }

  protected updateCalcValue(content: string): void {
    this.service.calcValue.update((value) => (value += content));
  }

  protected setCalcValue(content: string): void {
    this.service.calcValue.set(content);
  }

  protected getResultFn(isLastCharOperator?: boolean): string {
    if (isLastCharOperator) {
      let calcPreview = this.service.calcValue();
      const getResult = new Function(
        `return ${String(calcPreview.slice(0, -2))}`
      );
      return String(getResult());
    }
    const getResult = new Function(
      `return ${String(this.service.calcValue())}`
    );
    return String(getResult());
  }

  protected getLastOrNextToLastChar(i: 'last' | 'next-to-last'): string {
    if (i === 'last') {
      return String(
        this.service.calcValue()[this.service.calcValue().length - 1]
      );
    }
    if (i === 'next-to-last') {
      return String(
        this.service.calcValue()[this.service.calcValue().length - 2]
      );
    }
    return '';
  }

  protected clearLastChar(): void {
    this.service.calcValue.update((value) => value.slice(0, -1));
  }

  protected previewCheck(show?: boolean): void {
    if (show) {
      if (
        this.operators.includes(this.getLastOrNextToLastChar('next-to-last'))
      ) {
        this.service.togglePreview.set('');
      }
    }
    if (!show) {
      this.service.togglePreview.set('disabled');
    }
  }

  protected removeHighlightedFromAll(): void {
    for (let i = 0; i < this.interfaceButtons().length; i++) {
      if (this.interfaceButtons()[i].highlighted === 'highlighted') {
        this.interfaceButtons()[i].highlighted = '';
      }
    }
  }

  protected toggleHighlighted(idx: number): void {
    if (this.interfaceButtons()[idx].highlighted) {
      this.interfaceButtons()[idx].highlighted = '';
      return;
    }
    this.removeHighlightedFromAll();
    this.interfaceButtons()[idx].highlighted = 'highlighted';
  }

  protected buttonClick(prop: string, i: number): void {
    if (prop === 'C') {
      this.removeHighlightedFromAll();
      this.previewCheck(false);
      this.manageDot('restart');
      this.setCalcValue('0');
      return;
    }
    if (prop === '<') {
      this.removeHighlightedFromAll();
      if (this.operators.includes(this.getLastOrNextToLastChar('last'))) {
        this.manageDot('-limit');
      }
      if (
        this.operators.includes(this.getLastOrNextToLastChar('next-to-last'))
      ) {
        this.service.calcPreview.set(this.getResultFn(true));
      }
      if (this.getLastOrNextToLastChar('last') === '.') {
        this.clearLastChar();
        this.manageDot('-amount');
        return;
      }
      this.clearLastChar();
      if (this.service.calcValue() === '') {
        this.clearLastChar();
        this.setCalcValue('0');
        return;
      }
      if (!this.operators.includes(this.getLastOrNextToLastChar('last'))) {
        this.service.calcPreview.set(this.getResultFn());
      }
      if (
        !this.operators.some((char) => {
          return String(this.service.calcValue()).includes(char);
        })
      ) {
        this.previewCheck(false);
      }
      return;
    }
    if (this.operators.includes(prop)) {
      if (
        (this.dotAmountOnString < this.dotLimit &&
          this.dotAmountOnString > this.dotLimit - 1) ||
        this.dotAmountOnString === this.dotLimit
      ) {
        this.manageDot('+limit');
      }
      this.toggleHighlighted(i);
      if (this.operators.includes(this.getLastOrNextToLastChar('last'))) {
        this.clearLastChar();
      }
      this.updateCalcValue(prop);
      return;
    }
    if (prop === '.') {
      if (this.dotAmountOnString < this.dotLimit) {
        this.updateCalcValue(prop);
        this.manageDot('+amount');
        return;
      }
      return;
    }
    if (prop === '=') {
      if (this.operators.includes(this.getLastOrNextToLastChar('last'))) {
        return;
      }
      this.previewCheck(false);
      this.setCalcValue(this.getResultFn());
      return;
    }
    if (this.service.calcValue() === '0') {
      this.setCalcValue(prop);
      return;
    }
    this.updateCalcValue(prop);
    this.service.calcPreview.set(this.getResultFn());
    if (this.operators.includes(this.getLastOrNextToLastChar('next-to-last'))) {
      this.previewCheck(true);
    }
    this.removeHighlightedFromAll();
  }
}
