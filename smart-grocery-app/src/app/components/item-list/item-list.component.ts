import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../../services/grocery.service';
import { CartService } from '../../services/cart.service';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';  // Import for *ngFor
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]  // Required for *ngFor and forms
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];  // For search functionality
  errorMessage: string = '';
  isLoading: boolean = true;
  selectedQuantities: { [key: number]: number } = {};  // Store selected quantities for each item

  constructor(
    private groceryService: GroceryService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.groceryService.getItems().subscribe({
      next: (data: Item[]) => {
        this.items = data;
        this.filteredItems = data;  // Initialize search
        
        // Initialize selected quantities to 1 for all items
        this.items.forEach(item => {
          this.selectedQuantities[item.id] = 1;
        });
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching items:', error);
        this.errorMessage = 'Failed to load grocery items. Using mock data instead.';
        this.isLoading = false;
      }
    });
  }

  searchItem(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(searchValue)
    );
  }

  buyItem(item: Item): void {
    const quantity = this.selectedQuantities[item.id] || 1;
    this.cartService.addToCart(item, quantity);
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1) {
      this.selectedQuantities[itemId] = 1;
    } else {
      this.selectedQuantities[itemId] = quantity;
    }
  }

  deleteItem(id: number): void {
    this.groceryService.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== id);
        this.filteredItems = this.filteredItems.filter(item => item.id !== id);
      },
      error: (error) => {
        console.error('Error deleting item:', error);
        this.errorMessage = 'Failed to delete item.';
      }
    });
  }

  addItem(item: Item): void {
    this.groceryService.addItem(item).subscribe({
      next: (newItem: Item) => {
        this.items.push(newItem);
        this.filteredItems.push(newItem);  // Update filtered items as well
      },
      error: (error) => {
        console.error('Error adding item:', error);
        this.errorMessage = 'Failed to add item.';
      }
    });
  }
}
