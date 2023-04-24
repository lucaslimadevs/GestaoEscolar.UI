import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { CadastroDisciplinaComponent } from './pages/cadastro-disciplina/cadastro-disciplina.component';
import { ConsultaDisciplinaComponent } from './pages/consulta-disciplina/consulta-disciplina.component';
import { ConsultaTurmaComponent } from './pages/consulta-turma/consulta-turma.component';
import { CadastroTurmaComponent } from './pages/cadastro-turma/cadastro-turma.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: CadastroUsuarioComponent },
  { path: 'menu', component: MenuPrincipalComponent },
  { path: 'cadastra-disciplina', component: CadastroDisciplinaComponent },
  { path: 'editar-disciplina/:id', component: CadastroDisciplinaComponent },
  { path: 'consulta-disciplina', component: ConsultaDisciplinaComponent },
  { path: 'consulta-turma', component: ConsultaTurmaComponent },
  { path: 'cadastra-turma', component: CadastroTurmaComponent },
  { path: 'editar-turma/:id', component: CadastroTurmaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
