import { inject, Injectable } from '@angular/core';
import { Deputado } from './deputado';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeputadoService {
  private http = inject(HttpClient)
  APIURL = 'https://dadosabertos.camara.leg.br/api/v2'
  private deputados: Deputado[] = [];
  
  /** Obtém a lista de deputados  [...this.deputados] - a notação [...lista]
   * devolve uma cópia da lista original.
   */
  obterDeputados(): Observable<any> {
      return this.http.get(
        `${this.APIURL}/deputados?ordem=ASC&ordenarPor=nome`)
  }

  obterDeputadoPorNome(nome: string) {
    
  }

  obterDespesasDeputado(idDep: number) {

  }
}
