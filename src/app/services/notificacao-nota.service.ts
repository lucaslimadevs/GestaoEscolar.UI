import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InsertNotificacaoNotaCommand } from '../Models/comands/insert-notificacao-nota-command';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoNotaService {
  constructor(private http: HttpClient) {}

  salvar(disciplina: InsertNotificacaoNotaCommand) {
    return this.http.post(`${environment.urlApi}/api/NotificacaoNota`, disciplina);
  }

  deletar(id: string) {
    return this.http.delete(`${environment.urlApi}/api/NotificacaoNota/${id}`);
  }

  buscarPorIdUsuario(idUsuario: string) {    
    return this.http.get(`${environment.urlApi}/api/NotificacaoNota/usuario/${idUsuario}`);
  }}
