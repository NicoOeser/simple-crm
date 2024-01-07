import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Task } from "../../models/task.class";
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, addDoc, doc, getDocs, onSnapshot, query, orderBy  } from '@angular/fire/firestore';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatCardModule,],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  task = new Task();
  allTasks = Array();
  date!: Date;
  customers: any[] = [];
  sortIcon: string = 'filter_list';

  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router) { }

  ngOnInit() {
    this.getTasks();
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

  async getTasks() {
    const taskCollection = collection(this.firestore, 'tasks');
    const q = query(taskCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allTasks = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      this.sortByTitle();
    });
  }

  sortByTitle() {
    const orderByField = 'title';
    const sortedTasks = [...this.allTasks];
    sortedTasks.sort((a, b) => {
      const titleA = a[orderByField].toLowerCase();
      const titleB = b[orderByField].toLowerCase();
      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      } else {
        return 0;
      }
    });
    if (this.sortIcon === 'filter_list') {
      this.sortIcon = 'arrow_downward';
      this.allTasks = sortedTasks;
    } else {
      this.sortIcon = 'filter_list';
      this.allTasks = sortedTasks.reverse();
    }
  }

  openDeleteDialog(event: Event, taskId: string): void {
    event.stopPropagation();
    console.log('Opening delete dialog with taskId:', taskId);
    this.dialog.open(DeleteTaskComponent, {
      data: { taskId: taskId }
    });
  }

  openEditDialog(taskId: string): void  {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '400px', 
      data: { taskId: taskId, customers: this.customers } 
    });
  
    dialogRef.componentInstance.task = this.allTasks.find(task => task.id === taskId);
    dialogRef.componentInstance.taskId = taskId;
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
    });
  }
  

  openDialog(): void {
    this.dialog.open(DialogAddTaskComponent, {
      width: '600px',
    });
  }

  getCustomerName(customerId: string): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
  }

  getStatusName(status: string): string {
    switch (status) {
      case 'option1':
        return 'Not Started';
      case 'option2':
        return 'In Progress';
      case 'option3':
        return 'Complete';
      default:
        return 'Unknown';
    }
  }

  getTypeName(type: string): string {
    switch (type) {
      case 'option1':
        return 'Meeting';
      case 'option2':
        return 'Online Meeting';
      case 'option3':
        return 'Call';
      case 'option4':
        return 'Email';
      default:
        return 'Unknown';
    }
  }
}



