import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  public calcValue: WritableSignal<string> = signal('0');
  public togglePreview: WritableSignal<string> = signal('disabled');
  public calcPreview: WritableSignal<string> = signal('0');
  constructor() {}
}
