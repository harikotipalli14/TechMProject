import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ItemListComponent } from './components/item-list/item-list.component';

const routes: Routes = [
  { path: '', component: ItemListComponent }  // Default route
];

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes)]
};
