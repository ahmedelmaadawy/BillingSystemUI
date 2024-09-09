import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../Components/sidebar/sidebar.component';
import { HomeComponent } from '../Components/home/home.component';
import { SalesInvoiceComponent } from '../Components/sales-invoice/sales-invoice.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,HomeComponent,SalesInvoiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task';
}



