import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip'; // Importing TooltipModule from PrimeNG
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ButtonModule, TooltipModule],
})
export class HomeModule {}
