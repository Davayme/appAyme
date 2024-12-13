import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importar el guard de autenticación
import { RedirectGuard } from './guards/redirect.guard'; // Importar el guard de redirección

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard], // Aplicar el guard de autenticación a la ruta de home
  },
  {
    path: 'resources/:courseId',
    loadChildren: () =>
      import('./resources/resources.module').then((m) => m.ResourcesPageModule),
    canActivate: [AuthGuard], // Aplicar el guard de autenticación a la ruta de resources
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [RedirectGuard], // Aplicar el guard de redirección a la ruta de login
  },
  {
    path: 'tasks/:courseId',
    loadChildren: () =>
      import('./tasks/tasks.module').then((m) => m.TasksPageModule),
    canActivate: [AuthGuard], // Aplicar el guard de autenticación a la ruta de tasks
  },
  {
    path: 'enrollment',
    loadChildren: () =>
      import('./enrollment/enrollment.module').then(
        (m) => m.EnrollmentPageModule
      ),
    canActivate: [AuthGuard], // Aplicar el guard de autenticación a la ruta de enrollment
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}