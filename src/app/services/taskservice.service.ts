import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from '../models/ITasks';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
  private apiUrl = 'http://localhost:3000/tasks/materia';

  constructor(private http: HttpClient) {}

  getTasks(courseId: string, uid: string): Observable<Tasks[]> {
    const url = `${this.apiUrl}/${courseId}/${uid}`;
    return this.http.get<Tasks[]>(url);
  }
}
