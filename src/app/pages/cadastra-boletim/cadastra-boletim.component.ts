import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPager } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Usuario } from 'src/app/Models/Usuario';
import { InsertBoletimCommand } from 'src/app/Models/comands/insert-boletim-command';
import { AuthService } from 'src/app/services/auth.service';
import { BoletimService } from 'src/app/services/boletim.service';

@Component({
  selector: 'app-cadastra-boletim',
  templateUrl: './cadastra-boletim.component.html',
  styleUrls: ['./cadastra-boletim.component.css']
})
export class CadastraBoletimComponent implements OnInit {
  boletim: InsertBoletimCommand = new InsertBoletimCommand;  
  faPager = faPager;
  users: any[] = [];
  p: number = 1;
  total!: number | null;
  idBoletim: string | null = null;
  edicao: boolean = false;
  usuarios: Usuario[] = [];
  disciplinaSelectedValue: string = '';
  usuarioSelectedValue: string = '';
  
  private boletimService: BoletimService;  
  private toastr: ToastrService;
  private route: ActivatedRoute  
  private authService: AuthService;

  constructor(boletimService: BoletimService, authService: AuthService, toastr: ToastrService, route: ActivatedRoute) 
  {    
    this.boletimService = boletimService;
    this.toastr = toastr;
    this.route = route;    
    this.authService = authService;
  }

  ngOnInit(): void {    
    this.buscarUsuarios();

    this.idBoletim = this.route.snapshot.params['id'];

    if (this.idBoletim) {
      this.edicao = true;

      this.boletimService.buscarPorId(this.idBoletim)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao buscar boletim');
          return of(null);
        })
      )
      .subscribe((data: any) => {        
        const dataFormatada = data.dataEntrega.toString().substr(0, 10);

        this.boletim.id = data.id;
        this.boletim.dataEntrega = dataFormatada;        
        this.boletim.idUsuario = data.idUsuario;        
        this.usuarioSelectedValue = data.idUsuario;    
      });       
    }
  }

  onSubmit() {
    if (!this.camposValidos()) return;
    
    this.boletim.idUsuario = this.usuarioSelectedValue;    

    if (!this.edicao){
      this.boletimService.salvar(this.boletim)
        .pipe(
          catchError((error) => {
            this.toastr.error('', 'Erro ao cadastrar');
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data){          
            this.toastr.success('', 'Boletim cadastrada com sucesso!');    
            this.limparCampos();
          }else{
            this.toastr.warning('', 'preencha os camposa para cadastrar');
          }
        });       
    }else{      
      this.boletimService.editar(this.boletim)
        .pipe(
          catchError((error) => {
            this.toastr.error('', 'Erro ao editar');
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data){          
            this.toastr.success('', 'Boletim editada com sucesso!');    
            this.limparCampos();
          }else{
            this.toastr.warning('', 'preencha os campos para editar');
          }

          this.edicao = false;
        });
    }
  }

  camposValidos(): boolean{
    if (!this.usuarioSelectedValue.trim()){
      this.toastr.info("Preencha Usuário para cadastrar");
      return false;
    }

    if (!this.boletim.dataEntrega){
      this.toastr.info("Preencha Data de Entrega para cadastrar");
      return false;
    }

    return true;
  }

  buscarUsuarios(){
    this.authService.buscarUsuarios()
    .pipe()
    .subscribe((data: any) => {
      this.usuarios = data;
    });     
  }

  limparCampos() {
    this.boletim = new InsertBoletimCommand;    
    this.usuarioSelectedValue = '';    
    this.disciplinaSelectedValue = '';
  }
}
