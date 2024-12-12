import { Component, inject } from '@angular/core';
import { User } from '../models/IUser';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { UserManagementService } from './services/user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: User = { email: '', password: '' };

  firebaseService = inject(FirebaseService);
  router = inject(Router);
  userManagementSrv = inject(UserManagementService);

  async login() {
    try {
      const userCredential = await this.firebaseService.signIn(this.user);

      if (userCredential) {
        const { uid, email } = userCredential.user;
        this.userManagementSrv.getUser({ uid, email }).subscribe((user) => {
          localStorage.setItem('user', JSON.stringify(user));
        });
        this.router.navigate(['/home']);
      }

      await this.firebaseService.saveUserEmail(this.user.email);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }
}
