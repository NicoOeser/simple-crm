import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Task } from "../../models/task.class";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Firestore, collection, doc, updateDoc, getFirestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatProgressBarModule, MatDatepickerModule, MatSelectModule, MatOptionModule],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})

export class EditTaskComponent {
  firestore: Firestore = getFirestore();  
  task!: Task;
  taskId!: string;
  isLoading: boolean = false;
  date!: Date;
  customers: any[] = [];
  showFormValidationMessage: boolean = false;

  isFormValid(): boolean {
    return !!this.task.title && !!this.date && !!this.task.customer && !!this.task.status && !!this.task.type;
  }

  constructor(public dialogRef: MatDialogRef<EditTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.customers = data.customers;
    const taskCollection = collection(this.firestore, 'tasks');
    this.task = new Task(); 
  }

  async saveTask() {
    console.log('this.task:', this.task);
    if (!this.isFormValid()) {
      return;
    }
    this.isLoading = true;
    const taskRef = doc(this.firestore, 'tasks', this.taskId);
    const updatedDate = this.date instanceof Date ? this.date : new Date(this.date);
    const updateData: { [key: string]: any } = { ...this.task, date: updatedDate };
    await updateDoc(taskRef, updateData);
    this.closeDialog();
    this.isLoading = false;
  }
  

  closeDialog() {
    this.dialogRef.close();
  }
}

