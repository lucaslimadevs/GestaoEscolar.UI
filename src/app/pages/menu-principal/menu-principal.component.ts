import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {faDoorOpen, faSchool } from '@fortawesome/free-solid-svg-icons'
import jwt_decode from 'jwt-decode';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificacaoNotaService } from 'src/app/services/notificacao-nota.service';
import { NotificacaoNota } from 'src/app/Models/NotificacaoNota';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  faDoorOpen=faDoorOpen;
  faSchool=faSchool;
  tokenPayload: any;
  notifications: any[] = [];
  notificacoesNota : NotificacaoNota[] = [];

  private router: Router;
  private auth: AuthService;
  private notificationService: NotificationService;
  private notificacaoNotaService: NotificacaoNotaService;
  
  constructor(
    auth: AuthService, 
    router: Router, 
    notificationService: NotificationService,
    notificacaoNotaService: NotificacaoNotaService) 
  {
    this.auth = auth;
    this.router = router;
    this.notificationService = notificationService;
    this.notificacaoNotaService = notificacaoNotaService;
  }

  ngOnInit(): void {    
    this.notifications = [];
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenPayload = jwt_decode(token);
    }

    this.getNotifications();
  }

  ehProfessor(): boolean {
    return this.tokenPayload.Tipo === 'Professor';
  }

  sair() {    
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  clearNotifications() {
    this.notificationService.clearNotifications();
    this.notifications = [];
  }

  temNotificacao(): boolean{
    return this.notifications.length != 0;
  }

  getNotifications() {    
    this.notificacaoNotaService
    .buscarPorIdUsuario(this.tokenPayload.sub)
    .pipe()
    .subscribe((data: any) => {

      this.notificacoesNota = data;
      this.notifications = this.notificationService.getNotifications();
      this.notificacoesNota.forEach((element) => {
        this.notificationService.addNotification({ title : `Nota lançada de ${element.nomeDisciplina}`, text : `nota: ${element.nota?.toString()}`  });  
      });  
    });

  }

  removeNotification(notification: any) {
    this.notificationService.removeNotification(notification);
  }
}