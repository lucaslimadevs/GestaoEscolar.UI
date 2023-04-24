import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InsertNotasBoletimCommand } from '../Models/comands/insert-notas-boletim.command';
import { FiltroGenerico } from '../Models/filtro-generico';

@Injectable({
  providedIn: 'root'
})
export class NotasBoletimService {
  constructor(private http: HttpClient) {}

  salvar(disciplina: InsertNotasBoletimCommand) {
    return this.http.post(`${environment.urlApi}/api/notasboletim`, disciplina);
  }

  editar(disciplina: InsertNotasBoletimCommand) {
    return this.http.put(`${environment.urlApi}/api/notasboletim`, disciplina);
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

    return this.http.get(`${environment.urlApi}/api/notasboletim/findAll`, { params: params});
  }

  deletar(id: string) {
    return this.http.delete(`${environment.urlApi}/api/notasboletim/${id}`);
  }

  buscarPorId(id: string) {
    return this.http.get(`${environment.urlApi}/api/notasboletim/${id}`);
  }
}
