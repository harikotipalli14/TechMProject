import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  itemCount: number = 0;
  orderPlaced: boolean = false;
  orderId: string = '';
  isProcessing: boolean = false;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(cart => {
      this.cartItems = cart;
      this.total = this.cartService.getCartTotal();
      this.itemCount = this.cartService.getCartItemCount();
    });
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1) return;
    this.cartService.updateCartItemQuantity(itemId, quantity);
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getSubtotal(cartItem: CartItem): number {
    return cartItem.item.price * cartItem.quantity;
  }

  async placeOrder() {
    if (this.cartItems.length === 0 || this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    
    try {
      const order = await this.ordersService.placeOrder();
      if (order) {
        this.orderPlaced = true;
        this.orderId = order.id;
        
        // Reset order placed status after 5 seconds
        setTimeout(() => {
          this.orderPlaced = false;
        }, 5000);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      this.isProcessing = false;
    }
  }
} 