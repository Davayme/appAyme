import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { initializeApp } from 'firebase/app'; // Asegúrate de importar desde 'firebase/app'

if (environment.production) {
  enableProdMode();
}

// Inicializa Firebase
initializeApp(environment.firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));