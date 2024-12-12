import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resource } from '../models/resource.interface'

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  baseUrl = `http://10.80.3.15:3000/resources`;  // La URL base de la API
  httpClient = inject(HttpClient);

  // Método para obtener los recursos de un curso dado su courseId
  getResources(courseId: string): Observable<Resource[]> {
    const url = `${this.baseUrl}/${courseId}`;  // Agregar el courseId a la URL
    return this.httpClient.get<Resource[]>(url);  // Realizar la petición GET
  }
}
