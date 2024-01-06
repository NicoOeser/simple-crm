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
  selector: 'app-delete-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatProgressBarModule, MatDialogModule,],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {
  productId!: string;


  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string },
    private firestore: Firestore,
    private router: Router,
  ) {
    this.productId = data.productId;
  }

  async deleteProduct() {
    if (!this.productId) {
      return;
    }

    try {
      const productRef = doc(this.firestore, 'products', this.productId);
      await deleteDoc(productRef);
      console.log('User deleted successfully');
      this.closeDialog();
      this.navigateToProductList();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  navigateToProductList() {
    this.router.navigate(['/product']);
  }
}


