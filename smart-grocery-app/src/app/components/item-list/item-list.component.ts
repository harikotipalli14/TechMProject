import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../../services/grocery.service';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';  // Import for *ngFor

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  standalone: true,
  imports: [CommonModule]  // Required for *ngFor
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];  // For search functionality

  constructor(private groceryService: GroceryService) {}

  ngOnInit() {
    this.groceryService.getItems().subscribe((data: Item[]) => {
      this.items = data;
      this.filteredItems = data;  // Initialize search
    });
  }

  searchItem(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(searchValue)
    );
  }

  deleteItem(id: number): void {
    this.groceryService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
      this.filteredItems = this.filteredItems.filter(item => item.id !== id);
    });
  }

  addItem(item: Item): void {
    this.groceryService.addItem(item).subscribe((newItem: Item) => {
      this.items.push(newItem);
      this.filteredItems.push(newItem);  // Update filtered items as well
    });
  }
}
