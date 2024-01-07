import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../models/order.class';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, updateDoc, getFirestore, collection, query, onSnapshot } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule 
  ],
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  order = new Order();
  firestore: Firestore = getFirestore();
  orderId: string;
  isLoading: boolean = false;
  customers: any[] = [];
  products: any[] = [];

  constructor(public dialogRef: MatDialogRef<EditOrderComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.orderId = data.orderId;
    this.products = data.products; // Hinzugefügt: Lade Produkte aus dem übergebenen Datenobjekt
  }

  async ngOnInit() {
    await this.getCustomers(); // Lade Kundeninformationen beim Initialisieren der Komponente
  }

  async getCustomers() {
    // Füge die Logik zum Laden der Kunden hinzu
    const customerCollection = collection(this.firestore, 'customers');
    const q = query(customerCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.customers = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    });
  }

  async saveOrder() {
    this.isLoading = true;
    const orderRef = doc(this.firestore, 'orders', this.orderId);

    // Konvertiere this.order in ein generisches Objekt
    const updateData: { [key: string]: any } = {
      product: this.order.product,
      company: this.order.company,
      pieces: this.order.pieces,
      status: this.order.status,
    };

    await updateDoc(orderRef, updateData);
    this.closeDialog();
    this.isLoading = false;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}




