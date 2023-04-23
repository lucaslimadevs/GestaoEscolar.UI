import { Component, OnInit } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { InsertDisciplinaCommand } from 'src/app/Models/comands/insert-disciplina-command';
import { Disciplina } from 'src/app/Models/disciplina';
import { FiltroGenerico } from 'src/app/Models/filtro-generico';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-consulta-disciplina',
  templateUrl: './consulta-disciplina.component.html',
  styleUrls: ['./consulta-disciplina.component.css']
})
export class ConsultaDisciplinaComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  faBook = faBook;  
  public paginaAtual: number = 1;
  total: number = 20;
  
  private disciplinaService: DisciplinaService;  
  private toastr: ToastrService;

  constructor(disciplinaService: DisciplinaService, toastr: ToastrService) 
  {    
    this.disciplinaService = disciplinaService;
    this.toastr = toastr;
  }
  ngOnInit(): void {
    this.buscarDisciplinas();
  }

  buscarDisciplinas() {
    var filtro = new FiltroGenerico;

    filtro.pagina = this.paginaAtual;
    filtro.quantidadePorPagina = 20;

    this.disciplinaService.buscarTodos(filtro)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao buscar disciplinas');
          return of(null);
        })
      )
      .subscribe((data: any) => {        
        this.disciplinas = data.valores;
        this.total = data.total;
      });
  }
  
  apagar(id: string) {
    this.disciplinaService.deletar(id)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao deletar disciplina');
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.toastr.success('', 'Disciplina apagada com sucesso!');
        this.buscarDisciplinas();
      });       
  }

  public onPageChange(event: any): void {
    this.paginaAtual = parseInt(event, 10);
    this.buscarDisciplinas();
  }
}
