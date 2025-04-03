import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';

const routes: Routes = [
  { path: '', component: ItemListComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)]
}).catch(err => console.error(err));
