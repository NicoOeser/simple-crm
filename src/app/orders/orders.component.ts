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
import { Order } from '../../models/order.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot, query, updateDoc, doc } from '@angular/fire/firestore';
import { DeleteOrderComponent } from '../delete-order/delete-order.component';
import { DialogAddOrderComponent } from '../dialog-add-order/dialog-add-order.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatCardModule,],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})

export class OrdersComponent implements OnInit {
  order = new Order();
  allOrders = Array(); 
  customers: any[] = [];
  products: any[] = [];
  sortIcon: string = 'filter_list';


  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router, ) { }

  ngOnInit() {
    this.getOrders();
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

  async getOrders() {
    const orderCollection = collection(this.firestore, 'orders');
    const q = query(orderCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allOrders = snapshot.docs.map((doc) => {
        const order: any = { id: doc.id, ...doc.data() };
        const productId = doc.data()['product'];
        order.price = this.getProductPrice(productId);
        return order;
      });
      this.sortByProduct();
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

  sortByProduct() {
    const orderByField = 'product'; 
    const sortedOrders = [...this.allOrders];
    sortedOrders.sort((a, b) => {
      const productA = a[orderByField].toLowerCase();
      const productB = b[orderByField].toLowerCase();
      if (productA < productB) {
        return -1;
      } else if (productA > productB) {
        return 1;
      } else {
        return 0;
      }
    });
    if (this.sortIcon === 'filter_list') {
      this.sortIcon = 'arrow_downward';
      this.allOrders = sortedOrders;
    } else {
      this.sortIcon = 'filter_list';
      this.allOrders = sortedOrders.reverse();
    }
  }

  openDeleteDialog(orderId: string): void {
    console.log('Opening delete dialog with taskId:', orderId);
    this.dialog.open(DeleteOrderComponent, {
      data: { orderId: orderId }
    });
  }


  openDialog(): void {
    this.dialog.open(DialogAddOrderComponent, {
      width: '600px',
    });
  }

  openEditDialog(orderId: string): void  {
    const dialogRef = this.dialog.open(EditOrderComponent, {
      width: '400px', 
      data: { orderId: orderId, customers: this.customers, products: this.products } 
    });
    dialogRef.componentInstance.order = this.allOrders.find(task => task.id === orderId);
    dialogRef.componentInstance.orderId = orderId;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      this.updateTotalInDatabase(orderId);
    });
  }
  
  private updateTotalInDatabase(orderId: string): void {
    const order = this.allOrders.find(o => o.id === orderId);
    if (order) {
      const total = this.calculateTotal(order.pieces, order.product);
      const orderRef = doc(collection(this.firestore, 'orders'), orderId);
      updateDoc(orderRef, { total: total });
    }
  }

 getCompanyName(customerId: string): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? `${customer.company}` : 'Unknown Customer';
  }

  getProductName(productId: string): string {
    const product = this.products.find(p => p.id === productId);
    return product ? `${product.productName}` : 'Unknown Product';
  }

  getProductPrice(productId: string): string {
    const product = this.products.find(p => p.id === productId);
    return product && product.productPrice ? `${product.productPrice}` : 'Unknown Price';
  }

  getStatusName(status: string): string {
    switch (status) {
      case 'option1':
        return 'Offer';
      case 'option2':
        return 'Sold';
      default:
        return 'Unknown';
    }
  }

  calculateTotal(pieces: string, productId: string): string {
    const productPrice = parseFloat(this.getProductPrice(productId).replace(',', '.')); 
    const total = parseInt(pieces) * productPrice;
    return total.toFixed(2); 
}
}



