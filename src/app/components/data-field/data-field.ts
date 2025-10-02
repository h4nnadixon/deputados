import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-field',
  standalone: true,
  template: `
    <div>
      <strong>{{ label }}:</strong> {{ value }}
    </div>
  `
})
export class DataField {
  @Input() label: string = '';
  @Input() value: string = '';
}
