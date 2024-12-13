import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    RouterLink,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent],
})
export class SharedModule {}
