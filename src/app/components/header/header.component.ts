import { Component, WritableSignal } from '@angular/core';
import { Service } from '@app/service.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public get calcValue(): WritableSignal<string> {
    return this.service.calcValue;
  }

  public get togglePreview(): WritableSignal<string> {
    return this.service.togglePreview;
  }

  public get calcPreview(): WritableSignal<string> {
    return this.service.calcPreview;
  }

  constructor(private service: Service) {}
}
