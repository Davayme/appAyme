import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { AddTaskTeacherComponent } from './add-task-teacher/add-task-teacher.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [TasksPage, AddTaskTeacherComponent]
})
export class TasksPageModule {}
