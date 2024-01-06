import { Component, inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../models/customer.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, collection, updateDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatProgressBarModule, MatDialogModule ],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})


export class EditCustomerComponent {
  firestore: Firestore = inject(Firestore);
  customer!: Customer;
  customerId!: string;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditCustomerComponent>) {
    const customerCollection = collection(this.firestore, 'customers');
  }

  async saveCustomer() {
    this.isLoading = true;
    const customerRef = doc(this.firestore, 'customers', this.customerId);
    await updateDoc(customerRef, this.customer.toJson());
    this.closeDialog();
    this.isLoading = false;
  }



  closeDialog() {
    this.dialogRef.close();
  }
  

}
