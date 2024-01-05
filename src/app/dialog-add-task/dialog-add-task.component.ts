import { Component, inject, } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Task } from "../../models/task.class";
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-dialog-add-task',
  standalone: true,
  imports: [  MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule, MatProgressBarModule, MatDatepickerModule, MatSelectModule, MatOptionModule ],
  providers: [ MatDatepickerModule, MatNativeDateModule ],
  templateUrl: './dialog-add-task.component.html',
  styleUrl: './dialog-add-task.component.scss'
})
export class DialogAddTaskComponent {
  task = new Task;
  date!: Date;
  firestore: Firestore = inject(Firestore);
  taskCollection;
  isLoading: boolean = false;

  
  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>,) {
    this.taskCollection = collection(this.firestore, 'tasks');
  }

  async saveTask() {
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

