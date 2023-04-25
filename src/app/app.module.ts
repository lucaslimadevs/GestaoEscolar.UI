import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { TokenInterceptor } from './Interceptor/token-interceptor';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CadastroDisciplinaComponent } from './pages/cadastro-disciplina/cadastro-disciplina.component';
import { ConsultaDisciplinaComponent } from './pages/consulta-disciplina/consulta-disciplina.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConsultaTurmaComponent } from './pages/consulta-turma/consulta-turma.component';
import { CadastroTurmaComponent } from './pages/cadastro-turma/cadastro-turma.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ConsultaBoletimComponent } from './pages/consulta-boletim/consulta-boletim.component';
import { CadastraBoletimComponent } from './pages/cadastra-boletim/cadastra-boletim.component';
import { CadastroNotasBoletimComponent } from './pages/cadastro-notas-boletim/cadastro-notas-boletim.component';
import { ConsultaNotasBoletimComponent } from './pages/consulta-notas-boletim/consulta-notas-boletim.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    MenuPrincipalComponent,
    CadastroDisciplinaComponent,
    ConsultaDisciplinaComponent,
    ConsultaTurmaComponent,
    CadastroTurmaComponent,    
    PageNotFoundComponent, 
    ConsultaBoletimComponent, 
    CadastraBoletimComponent, 
    CadastroNotasBoletimComponent, ConsultaNotasBoletimComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { 
}
