import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceServiceService } from '../../Services/service-invoice.service';
import { IInvoiceDetails } from '../../Models/IInvoiceDetails';


@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent implements OnInit {

  constructor(
    private activatedRouter:ActivatedRoute,private service:InvoiceServiceService
  ) {}
  invoice: IInvoiceDetails = {}as IInvoiceDetails;
  invoiceid:number=0;
  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe({
      next:(prams)=>{
        this.invoiceid=Number(prams.get("id"));
        this.service.getInvoiceById(this.invoiceid).subscribe({
          next:(response)=>{
            this.invoice=response;
          }
        })
      }
    })
  }

}
