import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Tasks } from 'src/app/models/ITasks';

@Component({
  selector: 'app-add-task-teacher',
  templateUrl: './add-task-teacher.component.html',
  styleUrls: ['./add-task-teacher.component.scss'],
})
export class AddTaskTeacherComponent implements OnInit {
  @Input() task!: Tasks;
  uploadForm!: FormGroup;
  file: File | null = null;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private toastController: ToastController) {}

  ngOnInit() {
    this.uploadForm = this.fb.group({
      nombre: [{ value: this.task.nombre, disabled: true }, Validators.required],
      file: [null, Validators.required]
    });
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      this.uploadForm.patchValue({ file: file });
    }
  }

  async onSubmit() {
    if (this.uploadForm.valid) {
      this.presentToast('Tarea enviada exitosamente');
      this.dismissModal();
    }
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