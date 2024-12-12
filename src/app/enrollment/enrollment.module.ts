import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollmentPageRoutingModule } from './enrollment-routing.module';

import { EnrollmentPage } from './enrollment.page';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnrollmentPageRoutingModule,
    SharedModule
],
  declarations: [EnrollmentPage]
})
export class EnrollmentPageModule {}
