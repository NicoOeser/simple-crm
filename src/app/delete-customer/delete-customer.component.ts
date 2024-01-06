import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Customer } from '../../models/customer.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-customer',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatProgressBarModule, MatDialogModule,],
  templateUrl: './delete-customer.component.html',
  styleUrl: './delete-customer.component.scss'
})


export class DeleteCustomerComponent {
  customerId!: string;


  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: string },
    private firestore: Firestore,
    private router: Router,
  ) {
    this.customerId = data.customerId;
  }

  async deleteCustomer() {
    if (!this.customerId) {
      return;
    }

    try {
      const customerRef = doc(this.firestore, 'customers', this.customerId);
      await deleteDoc(customerRef);
      console.log('User deleted successfully');
      this.closeDialog();
      this.navigateToCustomerList();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  navigateToCustomerList() {
    this.router.navigate(['/customer']);
  }
}


