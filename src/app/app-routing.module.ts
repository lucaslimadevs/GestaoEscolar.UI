import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { CadastroDisciplinaComponent } from './pages/cadastro-disciplina/cadastro-disciplina.component';
import { ConsultaDisciplinaComponent } from './pages/consulta-disciplina/consulta-disciplina.component';
import { ConsultaTurmaComponent } from './pages/consulta-turma/consulta-turma.component';
import { CadastroTurmaComponent } from './pages/cadastro-turma/cadastro-turma.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ConsultaBoletimComponent } from './pages/consulta-boletim/consulta-boletim.component';
import { CadastraBoletimComponent } from './pages/cadastra-boletim/cadastra-boletim.component';
import { CadastroNotasBoletimComponent } from './pages/cadastro-notas-boletim/cadastro-notas-boletim.component';
import { ConsultaNotasBoletimComponent } from './pages/consulta-notas-boletim/consulta-notas-boletim.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: CadastroUsuarioComponent },
  { path: 'menu', component: MenuPrincipalComponent, canActivate: [AuthGuardService] },
  { path: 'cadastra-disciplina', component: CadastroDisciplinaComponent , canActivate: [AuthGuardService] },
  { path: 'editar-disciplina/:id', component: CadastroDisciplinaComponent , canActivate: [AuthGuardService] },
  { path: 'consulta-disciplina', component: ConsultaDisciplinaComponent, canActivate: [AuthGuardService] }, 
  { path: 'consulta-turma', component: ConsultaTurmaComponent , canActivate: [AuthGuardService] },
  { path: 'cadastra-turma', component: CadastroTurmaComponent , canActivate: [AuthGuardService] },
  { path: 'editar-turma/:id', component: CadastroTurmaComponent , canActivate: [AuthGuardService] },
  { path: 'consulta-boletim', component: ConsultaBoletimComponent , canActivate: [AuthGuardService] },
  { path: 'cadastra-boletim', component: CadastraBoletimComponent , canActivate: [AuthGuardService] },
  { path: 'editar-boletim/:id', component: CadastraBoletimComponent , canActivate: [AuthGuardService] },
  { path: 'cadastro-notas-boletim', component: CadastroNotasBoletimComponent , canActivate: [AuthGuardService] },
  { path: 'editar-notas-boletim/:id', component: CadastroNotasBoletimComponent , canActivate: [AuthGuardService] },
  { path: 'consulta-notas-boletim', component: ConsultaNotasBoletimComponent , canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent , canActivate: [AuthGuardService]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
