import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FiltroGenerico } from '../Models/filtro-generico';
import { environment } from '../environments/environment';
import { InsertTurmaCommand } from '../Models/comands/insert-turma-command';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  constructor(private http: HttpClient) {}

  salvar(disciplina: InsertTurmaCommand) {
    return this.http.post(`${environment.urlApi}/api/turma`, disciplina);
  }

  editar(disciplina: InsertTurmaCommand) {
    return this.http.put(`${environment.urlApi}/api/turma`, disciplina);
  }

  buscarTodos(filtro: FiltroGenerico) {    
    var params;
    
    if (filtro.quantidadePorPagina){
      params = new HttpParams()
      .set('Pagina', filtro.pagina)
      .set('QuantidadePorPagina', filtro.quantidadePorPagina ?? null);
    }else{
      params = new HttpParams()
      .set('Pagina', filtro.pagina)
    }        

    return this.http.get(`${environment.urlApi}/api/turma/findAll`, { params: params});
  }

  deletar(id: string) {
    return this.http.delete(`${environment.urlApi}/api/turma/${id}`);
  }

  buscarPorId(id: string) {
    return this.http.get(`${environment.urlApi}/api/turma/${id}`);
  }}
