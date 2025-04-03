import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule]  // Import RouterModule for <router-outlet>
})
export class AppComponent {
  title = 'GroceryApp';
}
