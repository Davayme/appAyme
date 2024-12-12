import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-task-teacher',
  templateUrl: './add-task-teacher.component.html',
  styleUrls: ['./add-task-teacher.component.scss'],
})
export class AddTaskTeacherComponent  {

  taskForm: FormGroup;

  constructor(private modalController: ModalController, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      nombre: ['', Validators.required],
      nota: ['', Validators.required],
      observacion: ['', Validators.required],
    });
  }

  

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Aquí puedes agregar la lógica para guardar la tarea
      console.log('Tarea agregada:', this.taskForm.value);
      this.modalController.dismiss(this.taskForm.value);
    }
  }

  

}
