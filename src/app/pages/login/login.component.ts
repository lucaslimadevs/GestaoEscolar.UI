import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { faSchool } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string = "";
  public password: string = "";
  faSchool=faSchool;
  private auth: AuthService;
  private router: Router;
  private toastr: ToastrService

  constructor( auth: AuthService, router: Router, toastr: ToastrService) 
  {
    this.auth = auth;
    this.router = router;
    this.toastr = toastr;
  }

  onSubmit() {
    this.auth.login(this.username, this.password)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao autenticar');
          return of(null);
        })
      )
      .subscribe((data: any) => {
        if (data && data.accessToken){
          this.auth.saveTokenInfo(data);          
          this.router.navigateByUrl('/menu');          
        }else{
          this.toastr.warning('', 'usuário ou senha incorretos');
        }
      }); 
  }
}
