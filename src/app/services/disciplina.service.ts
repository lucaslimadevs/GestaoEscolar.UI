import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { InsertDisciplinaCommand } from '../Models/comands/insert-disciplina-command';
import { FiltroGenerico } from '../Models/filtro-generico';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  constructor(private http: HttpClient) {}

  salvar(disciplina: InsertDisciplinaCommand) {
    return this.http.post(`${environment.urlApi}/api/disciplina`, disciplina);
  }

  editar(disciplina: InsertDisciplinaCommand) {
    return this.http.put(`${environment.urlApi}/api/disciplina`, disciplina);
  }

  buscarTodos(filtro: FiltroGenerico) {
    let params = new HttpParams()
      .set('Pagina', filtro.pagina)
      .set('QuantidadePorPagina', filtro.quantidadePorPagina);

    return this.http.get(`${environment.urlApi}/api/disciplina/findAll`, { params: params});
  }

  deletar(id: string) {
    return this.http.delete(`${environment.urlApi}/api/disciplina/${id}`);
  }

  buscarPorId(id: string) {
    return this.http.get(`${environment.urlApi}/api/disciplina/${id}`);
  }
}
