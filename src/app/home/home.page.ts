/*import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from './services/course.service';
import { ICourse } from './models/course';
import { IUser } from '../login/models/user';
import { Router } from '@angular/router';
import { interval, take, takeWhile } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  courses: ICourse[] = [];
  courseSrv = inject(CourseService);
  user: IUser | null = null;
  router = inject(Router);

  ngOnInit(): void {
    this.tryReloadUser();
  }

  tryReloadUser() {
    interval(100)
      .pipe(
        takeWhile(() => !this.user, true),
        take(20)
      )
      .subscribe({
        next: () => {
          this.loadUser();
          if (this.user) {
            this.loadCourses();
          }
        },
        complete: () => {
          if (!this.user) {
            this.router.navigate(['/login']);
          }
        },
      });
  }

  loadUser(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  async loadCourses() {
    this.courseSrv.getCourses(this.user!.uid).subscribe((response) => {
      console.log('Courses response:', response);
      this.courses = response;
      this.courses.map((course) => {
      });
    });
  }

  redirectToCourseResources(courseId: number) {
    this.router.navigate(['resources', courseId]);
  }

  redirectToCourseTasks(courseId: number) {
    this.router.navigate(['tasks', courseId]);
  }
}
*/

import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from './services/course.service';
import { ICourse } from './services/course.service';
import { IUser } from '../login/models/user';
import { Router } from '@angular/router';
import { interval, take, takeWhile } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  courses: ICourse[] = [];
  courseSrv = inject(CourseService);
  user: IUser | null = null;
  router = inject(Router);

  ngOnInit(): void {
    this.tryReloadUser();
  }

  tryReloadUser() {
    interval(100)
      .pipe(
        takeWhile(() => !this.user, true),
        take(20)
      )
      .subscribe({
        next: () => {
          this.loadUser();
          if (this.user) {
            this.loadCourses();
          }
        },
        complete: () => {
          if (!this.user) {
            this.router.navigate(['/login']);
          }
        },
      });
  }

  loadUser(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  async loadCourses() {
    this.courseSrv.getCourses(this.user!.uid).subscribe((response) => {
      console.log('Courses response:', response);
      this.courses = response;
    });
  }

  redirectToCourseResources(courseId: number) {
    this.router.navigate(['resources', courseId]);
  }

  redirectToCourseTasks(courseId: number) {
    this.router.navigate(['tasks', courseId]);
  }
}
