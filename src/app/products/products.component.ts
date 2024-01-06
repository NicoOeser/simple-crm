import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog, } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Product } from "../../models/product.class";
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, addDoc, doc, getDocs, onSnapshot, query } from '@angular/fire/firestore';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatCardModule,],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  product = new Product();
  allProducts = Array();
  productId: any;
  sortIcon: string = 'filter_list';
  

  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router) { }

  ngOnInit() {
    this.getProducts();

  }

  async getProducts() {
    const productCollection = collection(this.firestore, 'products');
    const q = query(productCollection);
    const orderByField = 'productName'; // Standard-Sortierfeld (Product Name)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allProducts = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      this.sortByProduct(); // Standardmäßig nach Product Name sortieren
    });
  }

  sortByProduct() {
    const orderByField = 'productName';
    const sortedProducts = [...this.allProducts];
    sortedProducts.sort((a, b) => {
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
      this.allProducts = sortedProducts;
    } else {
      this.sortIcon = 'filter_list';
      this.allProducts = sortedProducts.reverse();
    }
  }

  navigateToProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }


  openDeleteDialog(productId: string): void {
    console.log('Opening delete dialog with customerId:', productId);
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: { productId: productId },
      position: { top: '570px' },
    });
  }

  openDialog() {
    this.dialog.open(DialogAddProductComponent);
  }
}

