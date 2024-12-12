import { Component, inject, OnInit } from '@angular/core';
import { User } from '../models/IUser';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: User = { email: '', password: '' };

  firebaseService = inject(FirebaseService);
  router = inject(Router);

  async login() {
    try {
      const userCredential = await this.firebaseService.signIn(this.user);

      if (userCredential) {
        this.router.navigate(['/home']);
      }

      await this.firebaseService.saveUserEmail(this.user.email);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }
}
