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
}
