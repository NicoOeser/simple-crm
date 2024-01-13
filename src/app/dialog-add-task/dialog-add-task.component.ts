import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Task } from "../../models/task.class";
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Firestore, collection, addDoc, onSnapshot, query  } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-dialog-add-task',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule , MatProgressBarModule, MatDatepickerModule, MatSelectModule, MatOptionModule ],
  providers: [ MatDatepickerModule, MatNativeDateModule ],
  templateUrl: './dialog-add-task.component.html',
  styleUrl: './dialog-add-task.component.scss'
})
export class DialogAddTaskComponent implements OnInit {
  task = new Task();
  date!: Date;
  firestore: Firestore = inject(Firestore);
  taskCollection;
  isLoading: boolean = false;
  customers: any[] = [];
  showFormValidationMessage: boolean = false;

  isFormValid(): boolean {
    return !!this.task.title && !!this.date && !!this.task.customer && !!this.task.status && !!this.task.type;
  }
  
  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>,) {
    this.taskCollection = collection(this.firestore, 'tasks');
  }

  ngOnInit() {
    this.getCustomers();
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

  async saveTask() {
    if (!this.isFormValid()) {
      return;
    }  
    this.isLoading = true;
    this.task.date = this.date;
    const docRef = await addDoc(this.taskCollection, this.task.toJson());
    this.isLoading = false;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}


