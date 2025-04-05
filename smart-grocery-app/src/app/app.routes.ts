// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

export const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'login', component: LoginPageComponent}
];

