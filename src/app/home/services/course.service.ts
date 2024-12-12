import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICourse } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = `${environment.baseUrl}/materia`;
  httpClient = inject(HttpClient);

  getCourses(uid: string): Observable<ICourse[]> {
    const response = this.httpClient.get<ICourse[]>(`${this.baseUrl}/${uid}`);

    return response;
  }
}
