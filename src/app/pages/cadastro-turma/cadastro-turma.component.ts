import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Usuario } from 'src/app/Models/Usuario';
import { InsertTurmaCommand } from 'src/app/Models/comands/insert-turma-command';
import { Disciplina } from 'src/app/Models/disciplina';
import { FiltroGenerico } from 'src/app/Models/filtro-generico';
import { AuthService } from 'src/app/services/auth.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.css']
})
export class CadastroTurmaComponent implements OnInit {
  turma: InsertTurmaCommand = new InsertTurmaCommand;  
  faPeopleGroup = faPeopleGroup;
  users: any[] = [];
  p: number = 1;
  total!: number | null;
  idTurma: string | null = null;
  edicao: boolean = false;
  disciplinas: Disciplina[] = [];
  usuarios: Usuario[] = [];
  disciplinaSelectedValue: string = '';
  usuarioSelectedValue: string = '';
  
  private turmaService: TurmaService;  
  private toastr: ToastrService;
  private route: ActivatedRoute
  private disciplinaService: DisciplinaService;
  private authService: AuthService;

  constructor(turmaService: TurmaService, authService: AuthService, disciplinaService: DisciplinaService, toastr: ToastrService, route: ActivatedRoute) 
  {    
    this.turmaService = turmaService;
    this.toastr = toastr;
    this.route = route;
    this.disciplinaService = disciplinaService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.buscarDisciplinas();
    this.buscarUsuarios();

    this.idTurma = this.route.snapshot.params['id'];

    if (this.idTurma) {
      this.edicao = true;

      this.turmaService.buscarPorId(this.idTurma)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao buscar turma');
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.turma.id = data.id;
        this.turma.idDisciplina = data.idDisciplina;
        this.turma.idUsuario = data.idUsuario;
        this.disciplinaSelectedValue = data.idDisciplina;
        this.usuarioSelectedValue = data.idUsuario;    
      });       
    }
  }

  onSubmit() {
    this.turma.idUsuario = this.usuarioSelectedValue;
    this.turma.idDisciplina = this.disciplinaSelectedValue;

    if (!this.edicao){
      this.turmaService.salvar(this.turma)
        .pipe(
          catchError((error) => {
            this.toastr.error('', 'Erro ao cadastrar');
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data){          
            this.toastr.success('', 'Turma cadastrada com sucesso!');    
            this.limparCampos();
          }else{
            this.toastr.warning('', 'preencha os camposa para cadastrar');
          }
        });       
    }else{      
      this.turmaService.editar(this.turma)
        .pipe(
          catchError((error) => {
            this.toastr.error('', 'Erro ao editar');
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data){          
            this.toastr.success('', 'Turma editada com sucesso!');    
            this.limparCampos();
          }else{
            this.toastr.warning('', 'preencha os camposa para editar');
          }

          this.edicao = false;
        });
    }
  }

  buscarUsuarios(){
    this.authService.buscarUsuarios()
    .pipe()
    .subscribe((data: any) => {
      this.usuarios = data;
    });     
  }

  buscarDisciplinas(){
    var filtro = new FiltroGenerico();
    filtro.pagina = 1;
    filtro.quantidadePorPagina = null;

    this.disciplinaService.buscarTodos(filtro)
    .pipe()
    .subscribe((data: any) => {              
      this.disciplinas = data.valores;
      this.total = data.total;
    });
  }

  limparCampos() {
    this.turma = new InsertTurmaCommand;    
    this.usuarioSelectedValue = '';    
    this.disciplinaSelectedValue = '';
  }
}
