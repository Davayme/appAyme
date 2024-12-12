import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AddTaskTeacherComponent } from './add-task-teacher/add-task-teacher.component';
import { Tasks } from '../models/ITasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: Tasks[] = [];

  constructor(private modalController: ModalController, private toastController: ToastController) {}

  ngOnInit() {
    this.loadTasks();
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
        this.presentToast('Archivo subido exitosamente');
      }
    });

    return await modal.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}