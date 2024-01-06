import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule, MatProgressBarModule, ],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.scss'
})
export class DialogAddProductComponent {
  product = new Product;
  firestore: Firestore = inject(Firestore);
  productCollection;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddProductComponent>) {
    this.productCollection = collection(this.firestore, 'products');
  }

  async saveProduct() {
    this.isLoading = true;
    const docRef = await addDoc(this.productCollection, this.product.toJson());
    this.isLoading = false;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
