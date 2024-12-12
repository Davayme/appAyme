import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from './services/resources.service'; // Asegúrate de importar el servicio
import { Resource } from './models/resource.interface';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {
  resources: Resource[] = []; // Lista de recursos
  showModal: boolean = false; // Controla la visibilidad del modal
  newResource: Resource = { id: 0, materia_id: 0, nombre: '' }; // Nuevo recurso

  constructor(
    private toastController: ToastController,
    private resourceService: ResourceService, // Inyectar el servicio
    private route: ActivatedRoute // Para acceder al parámetro de la URL
  ) {}

  ngOnInit() {
    // Obtener el courseId de la URL y cargar los recursos
    const courseId = this.route.snapshot.paramMap.get('courseId') as string;
    this.loadResources(courseId);
  }

  // Cargar recursos desde la API
  loadResources(courseId: string) {
    this.resourceService.getResources(courseId).subscribe({
      next: (data) => {
        this.resources = data; // Asignar los recursos a la variable
      },
      error: (err) => {
        console.error('Error al obtener recursos', err);
      },
    });
  }

  // Abrir modal para agregar recurso
  openModal() {
    this.showModal = true;
  }

  // Cerrar modal
  closeModal() {
    this.showModal = false;
  }

  async uploadResource() {
    if (this.newResource.nombre.trim() === '') {
      return;
    }

    // Lógica para agregar un nuevo recurso, si fuera necesario

    const toast = await this.toastController.create({
      message: 'Recurso subido.',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();

    this.newResource = { id: 0, materia_id: 0, nombre: '' };
    this.closeModal();
  }
}
