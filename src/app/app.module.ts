import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BackgroundComponent } from './background/background.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
