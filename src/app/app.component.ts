import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../Components/sidebar/sidebar.component';
import { ClientComponent } from "../Components/client/client.component";
import { EmployeeComponent } from "../Components/employee/employee.component";
import { UnitFormComponent } from "../Components/unit-form/unit-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ClientComponent, EmployeeComponent, UnitFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task';
}
