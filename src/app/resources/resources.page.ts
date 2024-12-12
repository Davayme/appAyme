import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

export interface Resource {
  id: number;
  materia_id: number;
  nombre: string;
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {
  resources: Resource[] = []; // Lista de recursos
  showModal: boolean = false; // Controla la visibilidad del modal
  newResource: Resource = { id: 0, materia_id: 0, nombre: '' }; // Nuevo recurso

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    this.loadResources();
  }

  // Cargar recursos desde localStorage
  loadResources() {
    const storedResources = localStorage.getItem('resources');
    this.resources = storedResources ? JSON.parse(storedResources) : [];
  }

  // Guardar recursos en localStorage
  saveResources() {
    localStorage.setItem('resources', JSON.stringify(this.resources));
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async uploadResource() {
    if (this.newResource.nombre.trim() === '') {
      return;
    }

    // Agregar nuevo recurso a la lista
    const newId = this.resources.length > 0 ? this.resources[this.resources.length - 1].id + 1 : 1;
    const newResource = { ...this.newResource, id: newId, materia_id: 1 };
    this.resources.push(newResource);

    // Guardar en localStorage
    this.saveResources();

    // Mostrar notificación
    const toast = await this.toastController.create({
      message: 'Recurso subido.',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();

    // Resetea el formulario y cierra el modal
    this.newResource = { id: 0, materia_id: 0, nombre: '' };
    this.closeModal();
  }
}
