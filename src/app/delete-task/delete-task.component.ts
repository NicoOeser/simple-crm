import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatProgressBarModule, MatDialogModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent {
  taskId!: string;

  constructor(public dialogRef: MatDialogRef<DeleteTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: { taskId: string }, private firestore: Firestore,  private router: Router) {
    this.taskId = data.taskId;
  }

  async deleteTask() {
    if (!this.taskId) {
      console.error('User task is not defined.');
      return;
    }

    try {
      const taskRef = doc(this.firestore, 'tasks', this.taskId);
      await deleteDoc(taskRef);
      console.log('Task deleted successfully');
      this.closeDialog();
      this.navigateToTaskList();
    } catch (error) {
      console.error('Error deleting Task:', error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  navigateToTaskList() {
    this.router.navigate(['/task']); 
  }
}


   


