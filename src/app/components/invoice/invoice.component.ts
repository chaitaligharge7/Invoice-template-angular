import {
  Component,
  OnInit,
  ElementRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent implements OnInit {
  ngOnInit(): void {}
  @ViewChild('invoiceContent') invoiceContent!: ElementRef;

  isDownloading = false;
  isDownloaded = false;

  invoice = {
    invoiceNo: 'INV-2025-001',
    date: '2025-11-11',
    dueDate: '2025-11-25',

    company: {
      name: 'Sunrise Pvt Ltd',
      address: 'sunlight raod,pune,411021',
      phone: '+91 98765 43210',
      email: 'billing@acme.com',
    },

    client: 
    {
      name: 'chaitali gharge',
      company: 'Chaitanya Pvt Ltd',
      address: 'Sunset Road,saniya plaza,Pune,411022',
      email: 'chaitali@example.com',
    },

    items: [
      { description: 'Angular Basics', quantity: 1, price: 1888 },
      { description: 'UI UX desgin', quantity: 1, price: 2000 },

      { description: 'Computer Basics', quantity: 3, price: 3000 },
    ],
    notes: 'Payment due within 15 days. Late fee applies after due date.',
  };

  get SubTotal(): number {
    return this.invoice.items.reduce((s, i) => s + i.quantity * i.price, 0);
  }

  get tax(): number {
    return Math.round(this.SubTotal * 0.18);
  }

  get Total(): number {
    return this.SubTotal + this.tax;
  }
  downloadPDF() {
    this.isDownloading = true;
    this.isDownloaded = false;

    const element = this.invoiceContent.nativeElement;
    html2pdf()
      .from(element)
      .save('Invoice.pdf')
      .then(() => {
        // ✅ mark as downloaded
        this.isDownloading = false;
        this.isDownloaded = true;

        // optional: reset after few seconds
        setTimeout(() => {
          this.isDownloaded = false;
        }, 3000);
      })
      .catch(() => {
        this.isDownloading = false;
      });
  }
}
