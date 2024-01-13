import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../services/firestore.service'; 
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
import { Firestore} from '@angular/fire/firestore';
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

  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router, private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getCustomers();
  }

  async getCustomers() {
    this.firestoreService.getCustomers().subscribe((customers) => {
      this.allCustomers = customers;
      this.sortByName(); 
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
    const orderByField = 'company';
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
  

  openDialog(): void {
    this.dialog.open(DialogAddCustomerComponent, {
      width: '600px',
    });
  }
  
}

