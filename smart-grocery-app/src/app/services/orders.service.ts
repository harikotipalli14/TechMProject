import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { CartService, CartItem } from './cart.service';
import { AuthService } from './auth.service';

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
export class OrdersService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private readonly STORAGE_KEY = 'smart_grocery_orders';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadOrdersFromStorage();
  }

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  async placeOrder(): Promise<Order | null> {
    try {
      // Get the current cart items
      const cartItems = await firstValueFrom(this.cartService.getCartItems());
      
      if (cartItems.length === 0) {
        return null;
      }

      const orderItems: OrderItem[] = cartItems.map((cartItem: CartItem) => ({
        itemId: cartItem.item.id,
        name: cartItem.item.name,
        category: cartItem.item.category,
        price: cartItem.item.price,
        quantity: cartItem.quantity
      }));

      // Get current user if available
      const currentUser = this.authService.getCurrentUser();
      
      const order: Order = {
        id: this.generateOrderId(),
        date: new Date(),
        items: orderItems,
        total: this.cartService.getCartTotal(),
        userId: currentUser ? currentUser.id.toString() : undefined
      };

      this.orders.unshift(order); // Add to beginning of array
      this.ordersSubject.next([...this.orders]);
      this.saveOrdersToStorage();
      
      // Clear the cart after placing order
      this.cartService.clearCart();
      
      return order;
    } catch (error) {
      console.error('Error placing order:', error);
      return null;
    }
  }

  private generateOrderId(): string {
    return 'ORD-' + Date.now().toString();
  }

  private loadOrdersFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const storedOrders = localStorage.getItem(this.STORAGE_KEY);
        if (storedOrders) {
          const parsedOrders = JSON.parse(storedOrders);
          // Convert date strings back to Date objects
          this.orders = parsedOrders.map((order: any) => ({
            ...order,
            date: new Date(order.date)
          }));
          this.ordersSubject.next([...this.orders]);
        }
      } catch (error) {
        console.error('Error loading orders from storage:', error);
      }
    }
  }

  private saveOrdersToStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.orders));
      } catch (error) {
        console.error('Error saving orders to storage:', error);
      }
    }
  }
} 