import { inject, Injectable } from '@angular/core';
import { Deputado } from './deputado';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeputadoService {
  private http = inject(HttpClient)
  APIURL = 'https://dadosabertos.camara.leg.br/api/v2'
  private deputados: Deputado[] = [];
  
  obterDeputados(): Observable<any> {
      return this.http.get(
        `${this.APIURL}/deputados?ordem=ASC&ordenarPor=nome`)
  }

  
  obterDeputadoPorNome(nome: string) {
  }
  
  obterDespesasDeputado(idDep: number) {
  }
  
  obterDeputadoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.APIURL}/deputados/${id}`).pipe(
      map(resposta => resposta.dados.ultimoStatus)
    );
  }
}
