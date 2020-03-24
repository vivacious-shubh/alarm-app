import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlarmsComponent } from './alarms/alarms.component';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [
    AppComponent,
    AlarmsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabViewModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ToastModule,
    TableModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
