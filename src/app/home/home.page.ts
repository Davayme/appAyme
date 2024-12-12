import { Component, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/IUser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: User = { email: '', password: '' };

  firebaseService = inject(FirebaseService);

  async login() {
    try {
      const userCredential = await this.firebaseService.signIn(this.user);
      console.log('Usuario logeado:', userCredential.user);
      await this.firebaseService.saveUserEmail(this.user.email);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }
}
