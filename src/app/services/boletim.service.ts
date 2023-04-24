import { Injectable } from '@angular/core';
import { FiltroGenerico } from '../Models/filtro-generico';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { InsertBoletimCommand } from '../Models/comands/insert-boletim-command';

@Injectable({
  providedIn: 'root'
})
export class BoletimService {
  constructor(private http: HttpClient) {}

  salvar(disciplina: InsertBoletimCommand) {
    return this.http.post(`${environment.urlApi}/api/boletim`, disciplina);
  }

  editar(disciplina: InsertBoletimCommand) {
    return this.http.put(`${environment.urlApi}/api/boletim`, disciplina);
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

    return this.http.get(`${environment.urlApi}/api/boletim/findAll`, { params: params});
  }

  deletar(id: string) {
    return this.http.delete(`${environment.urlApi}/api/boletim/${id}`);
  }

  buscarPorId(id: string) {
    return this.http.get(`${environment.urlApi}/api/boletim/${id}`);
  }
}
