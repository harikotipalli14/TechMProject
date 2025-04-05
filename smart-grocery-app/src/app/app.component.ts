import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthService } from './services/auth.service';
 // ✅ Update path if needed

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    LoginPageComponent, // ✅ This makes <app-login-page> work
    CartComponent,
    OrdersComponent
  ]
})
export class AppComponent implements OnInit {
  showLogin = false;
  showCart = false;
  showOrders = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
      this.showLogin = false;
    }
  }

  toggleLogin() {
    console.log('✅ Login button clicked'); // This must show in console
    this.showLogin = true;
    this.showCart = false;
    this.showOrders = false;
  }

  toggleCart() {
    this.showCart = !this.showCart;
    this.showLogin = false;
    this.showOrders = false;
  }

  toggleOrders() {
    this.showOrders = !this.showOrders;
    this.showLogin = false;
    this.showCart = false;
  }
}
