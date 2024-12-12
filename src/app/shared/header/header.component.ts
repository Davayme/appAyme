import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() showMenu!: boolean;

  utilsSvc = inject(UtilsService);
  firebaseSrv = inject(FirebaseService);
  router = inject(Router);

  dismissModal() {
    this.utilsSvc.dismisModal();
  }

  logout() {
    this.firebaseSrv.signOut();
    this.router.navigate(['login']);
  }
}
