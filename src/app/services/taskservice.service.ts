import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from '../models/ITasks';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskserviceService {
  private apiUrl = `${environment.baseUrl}/tasks/materia`;

  constructor(private http: HttpClient) {}

  getTasks(courseId: string, uid: string): Observable<Tasks[]> {
    const url = `${this.apiUrl}/${courseId}/${uid}`;
    return this.http.get<Tasks[]>(url);
  }
}
