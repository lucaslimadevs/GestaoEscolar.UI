import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Boletim } from 'src/app/Models/Boletim';
import { InsertNotasBoletimCommand } from 'src/app/Models/comands/insert-notas-boletim.command';
import { FiltroGenerico } from 'src/app/Models/filtro-generico';
import { Turma } from 'src/app/Models/turma';
import { TurmaService } from 'src/app/services/turma.service';
import { BoletimService } from 'src/app/services/boletim.service';
import { NotasBoletimService } from 'src/app/services/notas-boletim.service';
import { faListNumeric } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cadastro-notas-boletim',
  templateUrl: './cadastro-notas-boletim.component.html',
  styleUrls: ['./cadastro-notas-boletim.component.css']
})
export class CadastroNotasBoletimComponent implements OnInit {
  notasboletim: InsertNotasBoletimCommand = new InsertNotasBoletimCommand;
  faListNumeric = faListNumeric;
  users: any[] = [];
  p: number = 1;  
  idNotasBoletim: string | null = null;
  edicao: boolean = false;
  boletims: Boletim[] = [];
  turmas: Turma[] = [];
  boletimSelectedValue: string = '';
  turmaSelectedValue: string = '';
  
  private notasboletimService: NotasBoletimService;  
  private toastr: ToastrService;
  private route: ActivatedRoute
  private boletimService: BoletimService;
  private turmaService: TurmaService;

  constructor(
    notasboletimService: NotasBoletimService, 
    turmaService: TurmaService, 
    boletimService: BoletimService, 
    toastr: ToastrService, 
    route: ActivatedRoute) 
  {    
    this.notasboletimService = notasboletimService;
    this.toastr = toastr;
    this.route = route;
    this.boletimService = boletimService;
    this.turmaService = turmaService;
  }

  ngOnInit(): void {
    this.buscarTurmas();
    this.buscarBoletims();

    this.idNotasBoletim = this.route.snapshot.params['id'];

    if (this.idNotasBoletim) {
      this.edicao = true;

      this.notasboletimService.buscarPorId(this.idNotasBoletim)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao buscar notas boletim');
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.notasboletim.id = data.id;
        this.notasboletim.idBoletim = data.idBoletim;
        this.notasboletim.idTurma = data.idTurma;
        this.boletimSelectedValue = data.idBoletim;
        this.turmaSelectedValue = data.idTurma;    
      });       
    }
  }

  onSubmit() {
    if (!this.camposValidos()) return;

    this.notasboletim.idTurma = this.turmaSelectedValue;
    this.notasboletim.idBoletim = this.boletimSelectedValue;                 
    
    var boletim = this.boletims.find(e => e.id === this.boletimSelectedValue);
    this.notasboletim.idUsuario = boletim?.idUsuario ?? '';
    
    var turma = this.turmas.find(e => e.id === this.turmaSelectedValue);
    this.notasboletim.idDisciplina = turma?.idDisciplina ?? '';
    
    if((this.notasboletim.nota ?? 0) > 10.00){
      this.toastr.error('', 'Nota máxima é 10');
      return;
    }

    if (!this.edicao){
      this.notasboletimService.salvar(this.notasboletim)
        .pipe(
          catchError((error) => {
            this.toastr.error('', 'Erro ao cadastrar');
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data){          
            this.toastr.success('', 'Nota do Boletim cadastrada com sucesso!');    
            this.limparCampos();
          }else{
            this.toastr.warning('', 'preencha os camposa para cadastrar');
          }
        });       
    }else{      
      this.notasboletimService.editar(this.notasboletim)
        .pipe(
          catchError((error) => {
            this.toastr.error('', 'Erro ao editar');
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data){          
            this.toastr.success('', 'Nota do Boletim editada com sucesso!');    
            this.limparCampos();
          }else{
            this.toastr.warning('', 'preencha os campos para editar');
          }

          this.edicao = false;
        });
    }
  }

  camposValidos(): boolean{
    if (!this.boletimSelectedValue.trim()){
      this.toastr.info("Preencha Boletim para cadastrar");
      return false;
    }

    if (!this.turmaSelectedValue.trim()){
      this.toastr.info("Preencha Disciplina (Turma) para cadastrar");
      return false;
    }

    if (!this.notasboletim.nota){
      this.toastr.info("Preencha Nota para cadastrar");
      return false;
    }

    return true;
  }

  buscarTurmas(){    
    var filtro = new FiltroGenerico();
    filtro.pagina = 1;
    filtro.quantidadePorPagina = null;

    this.turmaService.buscarTodos(filtro)
    .pipe()
    .subscribe((data: any) => {              
      this.turmas = data.valores;
    });
  }

  buscarBoletims(){
    var filtro = new FiltroGenerico();
    filtro.pagina = 1;
    filtro.quantidadePorPagina = null;

    this.boletimService.buscarTodos(filtro)
    .pipe()
    .subscribe((data: any) => {              
      this.boletims = data.valores;
    });
  }

  limparCampos() {
    this.notasboletim = new InsertNotasBoletimCommand;    
    this.turmaSelectedValue = '';    
    this.boletimSelectedValue = '';
  }
}
