// src/app/services/grocery.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';  // Correct path

@Injectable({
  providedIn: 'root',
})
export class GroceryService {
  private apiUrl = 'http://localhost:5201/api/item';  // Ensure this matches your .NET API

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  // Delete an item
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
