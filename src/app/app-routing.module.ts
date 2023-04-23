import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { CadastroDisciplinaComponent } from './pages/cadastro-disciplina/cadastro-disciplina.component';
import { ConsultaDisciplinaComponent } from './pages/consulta-disciplina/consulta-disciplina.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: CadastroUsuarioComponent },
  { path: 'menu', component: MenuPrincipalComponent },
  { path: 'cadastra-disciplina', component: CadastroDisciplinaComponent },
  { path: 'editar-disciplina/:id', component: CadastroDisciplinaComponent },
  { path: 'consulta-disciplina', component: ConsultaDisciplinaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
