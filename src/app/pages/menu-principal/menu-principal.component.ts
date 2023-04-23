import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {faDoorOpen, faSchool } from '@fortawesome/free-solid-svg-icons'
import jwt_decode from 'jwt-decode';
import { NotificationService } from 'src/app/services/notification.service';

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

  private router: Router;
  private auth: AuthService;
  private notificationService: NotificationService;

  constructor(
    auth: AuthService, 
    router: Router, 
    notificationService: NotificationService) 
  {
    this.auth = auth;
    this.router = router;
    this.notificationService = notificationService;
  }

  ngOnInit(): void {    
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
    this.notifications = this.notificationService.getNotifications();
    this.notificationService.addNotification({ title : "teste 123", text : "Sua nota foi lançada" });
    this.notificationService.addNotification({ title : "teste 3", text : "Sua nota foi lançada" });
    this.notificationService.addNotification({ title : "teste 3", text : "Sua nota foi lançada" });    
  }

  removeNotification(notification: any) {
    this.notificationService.removeNotification(notification);
  }
}