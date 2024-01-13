import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.class';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, updateDoc, getFirestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  firestore: Firestore = getFirestore();  
  product: Product = new Product();
  productId: string;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.productId = data.productId;
  }

  async saveProduct() {  
    this.isLoading = true;
    const productRef = doc(this.firestore, 'products', this.productId);  
    const updateData: { [key: string]: any } = {
      productName: this.product.productName,
      productPrice: this.product.productPrice,
    };
  
    await updateDoc(productRef, updateData);
    this.closeDialog();
    this.isLoading = false;
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}


