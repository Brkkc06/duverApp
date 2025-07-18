import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button'; // Importing ButtonModule from PrimeNG
import { TooltipModule } from 'primeng/tooltip';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { CalculateComponent } from './pages/calculate/calculate.component';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, NavbarComponent, CalculateComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    TooltipModule,
    ToolbarModule,
    CardModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
