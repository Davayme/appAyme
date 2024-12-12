import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent {

  @Input() title: string = ''; // Título de la tarjeta
  @Input() subtitle: string = ''; // Subtítulo de la tarjeta
  @Input() content: string = ''; // Contenido principal de la tarjeta
  @Input() buttonText: string = ''; // Texto del botón (opcional)
  @Output() buttonClick = new EventEmitter<void>(); // Evento para acciones al hacer clic

  onButtonClick() {
    this.buttonClick.emit(); // Emitir el evento cuando el botón sea clicado
  }

}
