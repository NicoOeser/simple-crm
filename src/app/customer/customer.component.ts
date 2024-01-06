import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog,} from '@angular/material/dialog';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Customer} from "../../models/customer.class";
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot, query } from '@angular/fire/firestore';
import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatCardModule,],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  allCustomers = Array();
  sortIcon: string = 'filter_list';

  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router) { }

  ngOnInit() {
    this.getCustomers();

  }

  async getCustomers() {
    const customerCollection = collection(this.firestore, 'customers');
    const q = query(customerCollection);
    const orderByField = 'firstName'; // Standard-Sortierfeld (Name)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allCustomers = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      this.sortByName(); // Standardmäßig nach Name sortieren
    });
  }

  navigateToCustomer(customerId: string) {
    this.router.navigate(['/customer', customerId]);
  }


  openDeleteDialog(customerId: string): void {
    console.log('Opening delete dialog with customerId:', customerId);
    const dialogRef = this.dialog.open(DeleteCustomerComponent, {
      data: { customerId: customerId },
      position: { top: '570px' },
    });
  }

  sortByName() {
    const orderByField = 'firstName';
    const sortedCustomers = [...this.allCustomers];
    sortedCustomers.sort((a, b) => {
      if (a[orderByField] < b[orderByField]) {
        return -1;
      } else if (a[orderByField] > b[orderByField]) {
        return 1;
      } else {
        return 0;
      }
    });
    if (this.sortIcon === 'filter_list') {
      this.sortIcon = 'arrow_downward';
      this.allCustomers = sortedCustomers;
    } else {
      this.sortIcon = 'filter_list';
      this.allCustomers = sortedCustomers.reverse();
    }
  }
  
  openDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }
}

