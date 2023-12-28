import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatDialogModule, MatDialog } from '@angular/material/dialog'; 
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from "../../models/user.class";
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, addDoc, doc, getDocs, onSnapshot, query } from '@angular/fire/firestore';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatCardModule, ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})


export class UserComponent implements OnInit{
  user = new User();
  allUsers = Array();


  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    const userCollection = collection(this.firestore, 'users');
    const q = query(userCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allUsers = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
  
      console.log(this.allUsers);
  
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          console.log("Modified user: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed user: ", change.doc.data());
        }
      });
    });
  }

  navigateToUser(userId: string) {
    this.router.navigate(['/user', userId]);
  }
  

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
