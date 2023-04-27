import { Component, OnInit } from '@angular/core';
import { InsertDisciplinaCommand } from 'src/app/Models/comands/insert-disciplina-command';
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-disciplina',
  templateUrl: './cadastro-disciplina.component.html',
  styleUrls: ['./cadastro-disciplina.component.css']
})
export class CadastroDisciplinaComponent implements OnInit {
  disciplina: InsertDisciplinaCommand = new InsertDisciplinaCommand;  
  faBook = faBook;
  users: any[] = [];
  p: number = 1;
  total!: number | null;
  idDisciplina: string | null = null;
  edicao: boolean = false;
  
  private disciplinaService: DisciplinaService;  
  private toastr: ToastrService;
  private route: ActivatedRoute

  constructor(disciplinaService: DisciplinaService, toastr: ToastrService, route: ActivatedRoute) 
  {    
    this.disciplinaService = disciplinaService;
    this.toastr = toastr;
    this.route = route;
  }

  ngOnInit(): void {
    this.idDisciplina = this.route.snapshot.params['id'];

    if (this.idDisciplina) {
      this.edicao = true;

      this.disciplinaService.buscarPorId(this.idDisciplina)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao buscar disciplina');
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.disciplina.id = data.id;
        this.disciplina.nome = data.nome;
        this.disciplina.cargaHoraria = data.cargaHoraria;
      });       
    }
  }

  onSubmit() {
    
    if (!this.camposValidos()) return;    

    if (!this.edicao){
      this.disciplinaService.salvar(this.disciplina)
        .pipe(
          catchError((error) => {
            this.toastr.error('', 'Erro ao cadastrar');
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data){          
            this.toastr.success('', 'Disciplina cadastrada com sucesso!');    
            this.limparCampos();
          }else{
            this.toastr.warning('', 'preencha os camposa para cadastrar');
          }
        });       
    }else{      
      this.disciplinaService.editar(this.disciplina)
        .pipe(
          catchError((error) => {
            this.toastr.error('', 'Erro ao editar');
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data){          
            this.toastr.success('', 'Disciplina editada com sucesso!');    
            this.limparCampos();
          }else{
            this.toastr.warning('', 'preencha os campos para editar');
          }

          this.edicao = false;
        });
    }
  }

  camposValidos(): boolean{    
    if (!this.disciplina.nome.trim()){
      this.toastr.info("Preencha Nome para cadastrar");
      return false;
    }

    if (!this.disciplina.cargaHoraria.trim()){
      this.toastr.info("Preencha Carga Horária para cadastrar");
      return false;
    }

    return true;
  }

  limparCampos() {
    this.disciplina = new InsertDisciplinaCommand;
  }
}
