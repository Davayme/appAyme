import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Push from 'push.js';
import { AddTaskTeacherComponent } from './add-task-teacher/add-task-teacher.component';
import { Tasks } from '../models/ITasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: Tasks[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.loadTasks();
    this.requestNotificationPermission();
  }

  loadTasks() {
    // Array estático de tareas
    this.tasks = [
      { nombre: 'Tarea 1', descripcion: 'Realizar una maqueta', estado: true },
      { nombre: 'Tarea 2', descripcion: 'Realizar una maqueta', estado: false },
      { nombre: 'Tarea 3', descripcion: 'Realizar una maqueta', estado: true },
    ];
  }

  async openAddTaskModal(task: Tasks) {
    const modal = await this.modalController.create({
      component: AddTaskTeacherComponent,
      componentProps: { task }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.presentNotification('Archivo subido exitosamente');
      }
    });

    return await modal.present();
  }

  requestNotificationPermission() {
    Push.Permission.request(
      () => {
        console.log('Permiso de notificación concedido');
        this.sendReminderNotification();
      },
      () => {
        console.log('Permiso de notificación denegado');
      }
    );
  }

  sendReminderNotification() {
    Push.create('Recordatorio de Tarea', {
      body: 'No olvides enviar tu tarea.',
      icon: '/assets/icon/task-icon.png', // Ruta al icono de la notificación
      timeout: 10000,
      onClick: function () {
        window.focus();
      }
    });
  }

  presentNotification(message: string) {
    const notification = Push.create('Notificación', {
      body: message,
      timeout: 5000,
      onClick: function () {
        window.focus();
     
      }
    });
  }
}