import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatsCounterComponent } from './stats-counter/stats-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SidebarComponent,
    StatsCounterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
