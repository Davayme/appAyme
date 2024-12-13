import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { ICourse } from '../models/course';

export interface ICourse {
  materia: string;
  materia_id: number;
  promedio: number;
}

@Injectable({
  providedIn: 'root',
})
/*
export class CourseService {
  baseUrl = `${environment.baseUrl}/materia`;
  httpClient = inject(HttpClient);

  getCourses(uid: string): Observable<ICourse[]> {
    const url = `${this.baseUrl}/${uid}`;
    console.log('Requesting courses with URL:', url); // Agregado para depurar
    const response = this.httpClient.get<ICourse[]>(url);
    return response;
  }*/

    export class CourseService {
      baseUrl = `${environment.baseUrl}/materia`;
      httpClient = inject(HttpClient);
    
      getCourses(uid: string): Observable<ICourse[]> {
        const url = `${this.baseUrl}/${uid}`;
        console.log('Requesting courses with URL:', url); // Agregado para depurar
        const response = this.httpClient.get<ICourse[]>(url);
        return response;
      }

}
