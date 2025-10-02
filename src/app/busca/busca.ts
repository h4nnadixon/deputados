import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DeputadoService } from '../model/deputado-service';

import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

interface Deputado {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
  email: string | null;
}

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [DeputadoService],
  templateUrl: './busca.html',
  styleUrl: './busca.css'
})
export class Busca {
  private deputadoService = inject(DeputadoService);

  deputado: Deputado | null = null;
  isLoading: boolean = false;
  erro: string | null = null;

  // Validações
  searchControl = new FormControl('', [
    Validators.required,      // Campo obrigatório
    Validators.min(1),        // Valor mínimo é 1 (não aceita negativos ou zero)
    Validators.pattern("^[0-9]+$") // Garante que são apenas números inteiros
  ]);

  onSearch() {
    //Verifica se o formulário é válido antes de buscar
    if (this.searchControl.invalid) {
      this.erro = "Por favor, corrija os erros no formulário.";
      this.searchControl.markAsTouched(); // Exibe as mensagens de erro se o usuário clicar sem digitar
      return;
    }
    const id = this.searchControl.value;
    if (id) {
      this.buscarDeputado(id);
    }
  }

  private buscarDeputado(id: string) {
    this.deputado = null;
    this.erro = null;
    this.isLoading = true;

    this.deputadoService.obterDeputadoPorId(Number(id)).subscribe({
      next: (dados: Deputado) => {
        this.deputado = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
        this.erro = `Nenhum deputado encontrado com o ID: ${id}.`;
        this.deputado = null;
        this.isLoading = false;
      }
    });
  }
}

