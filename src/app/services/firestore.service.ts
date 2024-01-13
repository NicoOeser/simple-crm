import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}
  getOrders(): Observable<any[]> {
    const ordersCollection = collection(this.firestore, 'orders');
    return from(getDocs(ordersCollection)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }

  getProducts(): Observable<any[]> {
    const productsCollection = collection(this.firestore, 'products');
    return from(getDocs(productsCollection)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }

  getCustomers(): Observable<any[]> {
    const customersCollection = collection(this.firestore, 'customers');
    return from(getDocs(customersCollection)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }

  getTasks(): Observable<any[]> {
    const tasksCollection = collection(this.firestore, 'tasks');
    return from(getDocs(tasksCollection)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }

  getProduct(productId: string): Observable<any> {
    const productDoc = doc(this.firestore, 'products', productId);
    return from(getDoc(productDoc)).pipe(
      map((productDoc) => ({ id: productDoc.id, ...productDoc.data() }))
    );
  }

}

