import { Component } from '@angular/core';
import { IItem } from '../../Models/IItem';
import { ItemService } from '../../Services/item.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css'
})
export class ItemsListComponent {
  items?: IItem[];
  constructor(private itemService: ItemService) {}
  ngOnInit(): void {
    this.itemService.getAllItems().subscribe({
      next: (response) => {
        this.items = response;
      },
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Item Deleted Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.items = this.items?.filter((c) => c.id != id);
      },
    });
  }
}
