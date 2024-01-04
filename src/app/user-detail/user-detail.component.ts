import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../../models/user.class';
import { Firestore, collection, doc, getDoc, getDocFromServer, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})


export class UserDetailComponent implements OnInit {
  public user = new User;
  userId: any;

  constructor(public dialog: MatDialog, private firestore: Firestore, private route: ActivatedRoute) {

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
      this.user = new User(doc.data());
    });
  }

  editUserDialog(): void {
    const dialogRef = this.dialog.open(EditUserComponent, { panelClass: 'custom-container' });
    dialogRef.componentInstance.user = new User(this.user.toJson());
    dialogRef.componentInstance.userId = this.userId;
  }

}
