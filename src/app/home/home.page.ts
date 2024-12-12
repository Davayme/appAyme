import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from './services/course.service';
import { ICourse } from './models/course';
import { IUser } from '../login/models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  courses: ICourse[] = [];
  courseSrv = inject(CourseService);
  teacher: IUser = JSON.parse(localStorage.getItem('user') || '{}');

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.courseSrv.getCourses(user.uid).subscribe((response) => {
      this.courses = response;
    });
  }
}
