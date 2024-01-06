import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Customer } from "../../models/customer.class";
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-customer',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule, MatProgressBarModule, ],
  templateUrl: './dialog-add-customer.component.html',
  styleUrl: './dialog-add-customer.component.scss'
})
export class DialogAddCustomerComponent {
  customer = new Customer;
  firestore: Firestore = inject(Firestore);
  customerCollection;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddCustomerComponent>) {
    this.customerCollection = collection(this.firestore, 'customers');
  }

  async saveCustomer() {
    this.isLoading = true;
    const docRef = await addDoc(this.customerCollection, this.customer.toJson());
    this.isLoading = false;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
