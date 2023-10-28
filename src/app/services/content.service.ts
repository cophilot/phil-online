import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private static initial: boolean = false;
  private static projects: any;

  constructor() {
    ContentService.init();
  }

  static async init() {
    if (ContentService.initial) {
      return;
    }
    this.initProjects();
    ContentService.initial = true;
  }

  static initProjects() {
    fetch(
      'https://raw.githubusercontent.com/phil1436/.project-provider/main/projects.json'
    ).then((response) => {
      response.json().then((json: any[]) => {
        this.projects = {
          de: [],
          en: [],
        };
        for (let project of json) {
          if (project.name.toLowerCase() == 'phil-online') {
            continue;
          }
          // ad new prop name active
          project.active = false;
          this.projects.en.push(project);
          let project_de: any = JSON.parse(JSON.stringify(project));
          if (project_de.description_de) {
            project_de.description = project_de.description_de;
          }
          this.projects.de.push(project_de);
        }
      });
    });
  }

  static getProjects(): any[] {
    this.init();
    return this.getJSONPropsByLanguage(this.projects);
  }

  static getJSONPropsByLanguage(json: any): any[] {
    if (json === undefined) {
      return [];
    }
    if (json.all) {
      return json.all;
    }
    if (json.multi) {
      return json.multi;
    }
    if (!AppComponent.IS_ENGLISH) {
      return json.de;
    }
    return json.en;
  }
}
