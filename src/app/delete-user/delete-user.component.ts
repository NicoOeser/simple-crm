import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatProgressBarModule, MatDialogModule,],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  userId!: string;


  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private firestore: Firestore,
    private router: Router,
  ) {
    this.userId = data.userId;
  }

  async deleteUser() {
    if (!this.userId) {
      console.error('User ID is not defined.');
      return;
    }

    try {
      const userRef = doc(this.firestore, 'users', this.userId);
      await deleteDoc(userRef);
      console.log('User deleted successfully');
      this.closeDialog();
      this.navigateToUserList();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  navigateToUserList() {
    this.router.navigate(['/user']);
  }
}


