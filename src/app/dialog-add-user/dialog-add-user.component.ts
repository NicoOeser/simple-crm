import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { User } from "../../models/user.class";
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule, MatProgressBarModule, ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})

export class DialogAddUserComponent {
  user = new User;
  firestore: Firestore = inject(Firestore);
  userCollection;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.userCollection = collection(this.firestore, 'users');
  }

  async saveUser() {
    this.isLoading = true;
    const docRef = await addDoc(this.userCollection, this.user.toJson());
    this.isLoading = false;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
