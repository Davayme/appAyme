export interface ICourse {
  id: number;
  materia_id: number;
  estudiante_uid: string;
  materias: IInternalCourse;
}

interface IInternalCourse {
  id: number;
  nombre: string;
  profesor_uid: string;
}
