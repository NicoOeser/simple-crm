import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from '../../models/customer.class';
import { Firestore, collection, doc, getDoc, getDocFromServer, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})

export class CustomerDetailComponent implements OnInit {
  public customer = new Customer;
  customerId: any;

  constructor(public dialog: MatDialog, private firestore: Firestore, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getId();
  }

  getId() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.customerId = params.get('id');
      this.getCustomer();
    });
  }

  async getCustomer() {
    const unsub = onSnapshot(doc(this.firestore, "customers", this.customerId), (doc) => {
      this.customer = new Customer(doc.data());
    });
  }

  editCustomerDialog(): void {
    const dialogRef = this.dialog.open(EditCustomerComponent, { panelClass: 'custom-container' });
    dialogRef.componentInstance.customer = new Customer(this.customer.toJson());
    dialogRef.componentInstance.customerId = this.customerId;
  }

}

