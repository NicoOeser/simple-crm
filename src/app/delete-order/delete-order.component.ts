import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-order',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatProgressBarModule, MatDialogModule,],
  templateUrl: './delete-order.component.html',
  styleUrl: './delete-order.component.scss'
})
export class DeleteOrderComponent {
  orderId!: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private firestore: Firestore,
    private router: Router,
  ) {
    this.orderId = data.orderId;
  }

  async deleteOrder() {
    if (!this.orderId) {
      return;
    }
    try {
      const orderRef = doc(this.firestore, 'orders', this.orderId);
      await deleteDoc(orderRef);
      console.log('User deleted successfully');
      this.closeDialog();
      this.navigateToOrderList();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  navigateToOrderList() {
    this.router.navigate(['/order']);
  }
}


