// src/app/services/grocery.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';  // Correct path

@Injectable({
  providedIn: 'root',
})
export class GroceryService {
  // Mock data for items
  private mockItems: Item[] = [
    { id: 1, name: 'Apples', quantity: 5, price: 2.99, category: 'Fruits' },
    { id: 2, name: 'Bread', quantity: 2, price: 3.49, category: 'Bakery' },
    { id: 3, name: 'Milk', quantity: 1, price: 4.99, category: 'Dairy' },
    { id: 4, name: 'Eggs', quantity: 12, price: 5.99, category: 'Dairy' },
    { id: 5, name: 'Chicken', quantity: 1, price: 8.99, category: 'Meat' },
    { id: 6, name: 'Rice', quantity: 1, price: 6.99, category: 'Grains' },
    { id: 7, name: 'Tomatoes', quantity: 6, price: 3.99, category: 'Vegetables' },
    { id: 8, name: 'Potatoes', quantity: 5, price: 4.99, category: 'Vegetables' }
  ];

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    // Return mock data instead of making HTTP request
    return of(this.mockItems);
  }

  addItem(item: Item): Observable<Item> {
    // Generate a new ID
    const newId = Math.max(...this.mockItems.map(i => i.id)) + 1;
    const newItem = { ...item, id: newId };
    
    // Add to mock data
    this.mockItems.push(newItem);
    
    // Return the new item
    return of(newItem);
  }

  // Delete an item
  deleteItem(id: number): Observable<void> {
    // Remove from mock data
    this.mockItems = this.mockItems.filter(item => item.id !== id);
    
    // Return void
    return of(void 0);
  }
}
