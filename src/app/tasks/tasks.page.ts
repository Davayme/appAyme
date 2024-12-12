import { Component, OnInit } from '@angular/core';
import { Tasks } from '../models/ITasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: Tasks[] = [];
  role: string | null = '';

  constructor() {}

  ngOnInit() {
    this.simulateStudentLogin();
    this.role = localStorage.getItem('role');
    this.loadTasks();
  }

  simulateStudentLogin() {
    localStorage.setItem('role', 'teacher');
  }

  loadTasks() {
    // Array estático de tareas
    const allTasks: Tasks[] = [
      { nombre: 'Tarea 1', nota: 'A', observacion: 'Bien hecho' },
      { nombre: 'Tarea 2', nota: 'B', observacion: 'Puede mejorar' },
      { nombre: 'Tarea 3', nota: 'C', observacion: 'Necesita más trabajo' },
    ];

    if (this.role === 'student') {
      this.tasks = allTasks.filter(task => task.nombre.includes('1') || task.nombre.includes('2'));
    } else if (this.role === 'teacher') {
      this.tasks = allTasks;
    }
  }
}