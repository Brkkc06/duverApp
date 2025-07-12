import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button'; // Importing ButtonModule from PrimeNG
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ButtonModule, TooltipModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
