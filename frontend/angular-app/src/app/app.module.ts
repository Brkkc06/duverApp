import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button'; // Importing ButtonModule from PrimeNG
import { TooltipModule } from 'primeng/tooltip';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ToolbarModule } from 'primeng/toolbar';
@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, ButtonModule, TooltipModule,ToolbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
