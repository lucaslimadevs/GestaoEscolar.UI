import { Component } from '@angular/core';
import { InsertDisciplinaCommand } from 'src/app/Models/insert-disciplina-command';
import { faBook } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cadastro-disciplina',
  templateUrl: './cadastro-disciplina.component.html',
  styleUrls: ['./cadastro-disciplina.component.css']
})
export class CadastroDisciplinaComponent {
  disciplina: InsertDisciplinaCommand = new InsertDisciplinaCommand;
  faBook = faBook;
  users: any[] = [];
  p: number = 1;
  total!: number | null;
  onSubmit() {
    // this.auth.register(this.registerUser)
    //   .pipe(
    //     catchError((error) => {
    //       this.toastr.error('', 'Erro ao cadastrar');
    //       return of(null);
    //     })
    //   )
    //   .subscribe((data: any) => {
    //     if (data){          
    //       this.toastr.success('', 'Usuário cadastrado com sucesso!');
    //       this.router.navigateByUrl('/login');          
    //     }else{
    //       this.toastr.warning('', 'usuário ou senha incorretos');
    //     }
    //   });       
  }
}
