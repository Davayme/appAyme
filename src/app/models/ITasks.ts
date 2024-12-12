export interface TareaEstudiante {
  estado: boolean;
}

export interface Tasks {
  nombre: string;
  descripcion: string;
  tarea_estudiantes: TareaEstudiante[];
}