import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.model';

export interface CartItem {
  item: Item;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    // Initialize cart from localStorage if available
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(item: Item, quantity: number): void {
    const existingItemIndex = this.cartItems.findIndex(
      cartItem => cartItem.item.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item already exists in cart
      this.cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      this.cartItems.push({ item, quantity });
    }

    // Update the cart subject and save to localStorage
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  updateCartItemQuantity(itemId: number, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(
      cartItem => cartItem.item.id === itemId
    );

    if (itemIndex !== -1) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        this.removeFromCart(itemId);
      } else {
        // Update quantity
        this.cartItems[itemIndex].quantity = quantity;
        this.cartSubject.next(this.cartItems);
        this.saveCartToStorage();
      }
    }
  }

  removeFromCart(itemId: number): void {
    this.cartItems = this.cartItems.filter(
      cartItem => cartItem.item.id !== itemId
    );
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  getCartTotal(): number {
    return this.cartItems.reduce(
      (total, cartItem) => total + (cartItem.item.price * cartItem.quantity),
      0
    );
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
  }
} 