import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <input type="number" [(ngModel)]="searchId" placeholder="Digite o ID do deputado" (keyup.enter)="onSearch()"/>
      <button (click)="onSearch()">Pesquisar</button>
    </div>
  `
})
export class SearchBar {
  @Output() searchEvent = new EventEmitter<number>();
  searchId: number | null = null;

  onSearch() {
    if (this.searchId) {
      this.searchEvent.emit(this.searchId);
    }
  }
}
