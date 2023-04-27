import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RegisterUserCommand } from 'src/app/Models/comands/register-user-command';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  public registerUser: RegisterUserCommand = new RegisterUserCommand;
  
  private auth: AuthService;
  private router: Router;
  private toastr: ToastrService

  constructor( auth: AuthService, router: Router, toastr: ToastrService) 
  {
    this.auth = auth;
    this.router = router;
    this.toastr = toastr;
  }
  
  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.camposValidos()) return;

    this.auth.register(this.registerUser)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao cadastrar');
          return of(null);
        })
      )
      .subscribe((data: any) => {
        if (data){          
          this.toastr.success('', 'Usuário cadastrado com sucesso!');
          this.router.navigateByUrl('/login');          
        }else{
          this.toastr.warning('', 'usuário ou senha incorretos');
        }
      });       
  }

  camposValidos(): boolean{
    if (!this.registerUser.nome.trim()){
      this.toastr.info("Preencha Nome para cadastrar");
      return false;
    }

    if (!this.registerUser.email.trim()){
      this.toastr.info("Preencha Email para cadastrar");
      return false;
    }

    if (!this.registerUser.password.trim()){
      this.toastr.info("Preencha Senha para cadastrar");
      return false;
    }

    if (!this.registerUser.confirmPassword.trim()){
      this.toastr.info("Preencha Confirmar Senha para cadastrar");
      return false;
    }

    if (!this.registerUser.dataNascimento){
      this.toastr.info("Preencha Data Nascimento para cadastrar");
      return false;
    }

    if (!this.registerUser.tipo){
      this.toastr.info("Preencha Tipo de Usuário para cadastrar");
      return false;
    }

    if (this.registerUser.password != this.registerUser.confirmPassword){
      this.toastr.info("Senhas não correspondem!");
      return false;
    }

    if (this.registerUser.password.length < 5){
      this.toastr.info("Senha deve possuir mais de Seis caracteres");
      return false;
    }

    return true;
  }

}
