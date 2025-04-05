import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';

// Order interfaces
export interface OrderItem {
  itemId: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: Date;
  items: OrderItem[];
  total: number;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:5000/api'; // This would be your actual API URL

  constructor(private http: HttpClient) {}

  // Item methods
  getItems(): Observable<Item[]> {
    // For now, return mock data
    return of([
      { id: 1, name: 'Apples', quantity: 5, price: 2.99, category: 'Fruits' },
      { id: 2, name: 'Bread', quantity: 2, price: 3.49, category: 'Bakery' },
      { id: 3, name: 'Milk', quantity: 1, price: 4.99, category: 'Dairy' },
      { id: 4, name: 'Eggs', quantity: 12, price: 5.99, category: 'Dairy' },
      { id: 5, name: 'Chicken', quantity: 1, price: 8.99, category: 'Meat' },
      { id: 6, name: 'Rice', quantity: 1, price: 6.99, category: 'Grains' },
      { id: 7, name: 'Tomatoes', quantity: 6, price: 3.99, category: 'Vegetables' },
      { id: 8, name: 'Potatoes', quantity: 5, price: 4.99, category: 'Vegetables' }
    ]);
  }

  addItem(item: Item): Observable<Item> {
    // Mock implementation
    const newItem = { ...item, id: Math.floor(Math.random() * 1000) };
    return of(newItem);
  }

  deleteItem(id: number): Observable<void> {
    // Mock implementation
    return of(void 0);
  }

  // Order methods
  getOrders(userId: string): Observable<Order[]> {
    // Mock implementation
    return of([]);
  }

  placeOrder(order: Order): Observable<Order> {
    // Mock implementation
    return of(order);
  }
} 