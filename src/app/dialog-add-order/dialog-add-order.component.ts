import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../services/firestore.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../models/order.class';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Firestore, collection, addDoc, onSnapshot, query  } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-add-order',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule , MatProgressBarModule, MatSelectModule, MatOptionModule ],
  templateUrl: './dialog-add-order.component.html',
  styleUrl: './dialog-add-order.component.scss'
})


export class DialogAddOrderComponent implements OnInit {
  order = new Order();
  firestore: Firestore = inject(Firestore);
  orderCollection;
  isLoading: boolean = false;
  customers: any[] = [];
  products: any[] = [];
  


  constructor(public dialogRef: MatDialogRef<DialogAddOrderComponent>,private firestoreService: FirestoreService) {
    this.orderCollection = collection(this.firestore, 'orders');
  }

  updatePrice() {
    const selectedProduct = this.products.find(p => p.id === this.order.product);
    const productPrice = selectedProduct ? selectedProduct.productPrice : 0;
    const pieces = this.order.pieces ? parseInt(this.order.pieces) : 0;
    this.order.total = (productPrice * pieces).toFixed(2);
  }

  ngOnInit() {
    this.getCustomers();
    this.getProducts();
  }


  async getCustomers() {
    const customerCollection = collection(this.firestore, 'customers');
    const q = query(customerCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.customers = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    });
  }

  async getProducts() {
    const productCollection = collection(this.firestore, 'products');
    const q = query(productCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.products = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    });
  }

  async saveOrder() { 
    this.isLoading = true;
    const productPrice = parseFloat(this.getProductPrice(this.order.product).replace(',', '.'));
    this.order.total = (parseInt(this.order.pieces) * productPrice).toFixed(2);
    const docRef = await addDoc(this.orderCollection, this.order.toJson());
    this.isLoading = false;
    this.closeDialog();
  }

  private getProductPrice(productId: string): string {
    const product = this.products.find(p => p.id === productId);
    return product && product.productPrice ? `${product.productPrice}` : 'Unknown Price';
  }

  closeDialog() {
    this.dialogRef.close();
  }
}




