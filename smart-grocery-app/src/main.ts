import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // if you're using this

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
