import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private toastController: ToastController,
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
    this.taskService.getTasks(this.courseId, this.uid).subscribe(
      (tasks :any) => {
        this.tasks = tasks;
      },
      (error : any) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
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
      icon: '/assets/icon/task-icon.png', 
      timeout: 10000,
      onClick: function () {
        window.focus();
      }
    });
  }

  presentNotification(message: string) {
    const notification = Push.create('Notificación', {
      body: message,
      timeout: 9000,
      onClick: function () {
        window.focus();
     
      }
    });
  }
}