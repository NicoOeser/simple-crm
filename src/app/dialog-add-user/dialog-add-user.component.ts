import { Component, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { User } from "../../models/user.class";
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatButtonModule, FormsModule,MatProgressBarModule],
  providers: [MatDatepickerModule, MatNativeDateModule,],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User;
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  userCollection;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.userCollection = collection(this.firestore, 'users');
  }

  noClick(): void {
  }

  async saveUser() {
    this.isLoading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);

    const docRef = await addDoc(this.userCollection, this.user.toJson());
    this.isLoading = false;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
