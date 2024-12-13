import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Push from 'push.js';
import { AddTaskTeacherComponent } from './add-task-teacher/add-task-teacher.component';
import { Tasks } from '../models/ITasks';
import { ActivatedRoute } from '@angular/router';
import { TaskserviceService } from '../services/taskservice.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: Tasks[] = [];
  courseId!: string;
  uid!: string;
  hasActiveTasks: boolean = false;
  hasOverdueTasks: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private taskService: TaskserviceService
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.uid = user.uid;
    this.loadTasks();
    this.requestNotificationPermission();
  }

  loadTasks() {
    this.taskService.getTasks(this.courseId, this.uid).subscribe({
      next: (tasks: any) => {
        this.tasks = tasks;
        this.hasActiveTasks = this.tasks.some(task => task.tarea_estudiantes[0]?.estado);
        this.hasOverdueTasks = this.tasks.some(task => !task.tarea_estudiantes[0]?.estado);

        // Enviar notificaciones para tareas pendientes y atrasadas
        this.sendTaskNotifications();
      },
      error: (error: any) => {
        console.error('Error al cargar las tareas:', error);
      }
    });
  }

  sendTaskNotifications() {
    this.tasks.forEach(task => {
      if (!task.tarea_estudiantes[0]?.estado) {
        this.sendNotification(`Tarea pendiente: ${task.nombre}`, 'Tienes una tarea pendiente.');
      } else {
        this.sendNotification(`Tarea atrasada: ${task.nombre}`, 'Tienes una tarea atrasada.');
      }
    });
  }

  sendNotification(title: string, message: string) {
    Push.create(title, {
      body: message,
      icon: '/assets/icon/task-icon.png',
      timeout: 10000,
      onClick: function () {
        window.focus();
      }
    });
  }

  requestNotificationPermission() {
    Push.Permission.request(
      () => {
        console.log('Permiso de notificación concedido');
      },
      () => {
        console.log('Permiso de notificación denegado');
      }
    );
  }

  sendReminderNotification() {
    Push.create('Recordatorio de Tarea', {
      body: 'No olvides enviar tu tarea.',
      icon: '/assets/icon/task-icon.png', 
      timeout: 10000,
      onClick: function () {
        window.focus();
      }
    });
  }

  presentNotification(message: string) {
    Push.create('Notificación', {
      body: message,
      timeout: 9000,
      onClick: function () {
        window.focus();
      }
    });
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
}