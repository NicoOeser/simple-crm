import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { User } from '../../models/user.class';
import { Firestore, collection, doc, getDoc, getDocFromServer, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})



export class UserDetailComponent implements OnInit {
  public user = new User;
  userId: any;



  constructor(public dialog: MatDialog, private firestore: Firestore, private route: ActivatedRoute ) {

  }

  ngOnInit() {
    this.getId();
  }

  getId() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
      this.getUser();
    });
  }

  async getUser() {
    const unsub = onSnapshot(doc(this.firestore, "users", this.userId), (doc) => {
      console.log("Current data: ", doc.data());
      this.user = new User(doc.data()); 
    });
  }
}
