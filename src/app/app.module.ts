import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BackgroundComponent } from './background/background.component';
import { MailFormComponent } from './mail-form/mail-form.component';
import { ChapterHeadingComponent } from './chapter-heading/chapter-heading.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SkillComponent } from './skill/skill.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    BackgroundComponent,
    MailFormComponent,
    ChapterHeadingComponent,
    TimelineComponent,
    SkillComponent,
    ProjectComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
