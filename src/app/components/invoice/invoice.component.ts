import {
  Component,
  OnInit,
  ElementRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent implements OnInit {
  ngOnInit(): void {}
  @ViewChild('invoiceContent') invoiceContent!: ElementRef;

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

    client: {
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
    const element = this.invoiceContent.nativeElement;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // full width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${this.invoice.invoiceNo}.pdf`);
    });
  }
}
