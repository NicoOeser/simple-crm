import { Component, inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, collection, updateDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatProgressBarModule, MatDialogModule ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})

export class EditUserComponent {
  firestore: Firestore = inject(Firestore);
  user!: User;
  userId!: string;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditUserComponent>) {
    const userCollection = collection(this.firestore, 'users');
  }

  async saveUser() {
    this.isLoading = true;
    const userRef = doc(this.firestore, 'users', this.userId);
    await updateDoc(userRef, this.user.toJson());
    this.closeDialog();
    this.isLoading = false;
  }



  closeDialog() {
    this.dialogRef.close();
  }
  

}
