import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-management',
  templateUrl: './user-profile-management.component.html',
  styleUrls: ['./user-profile-management.component.scss']
})
export class UserProfileManagementComponent implements OnInit {

  user;
  items;
  i=0;
  show = false;
  constructor(private adminService: AdminService, private userService: UserService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.adminService.getUser()
    .subscribe(
      (response) => {
        this.user = response;
      },
      (error) => console.log(error)
    ); 
  }

  getUserItems(){
    this.show = !this.show;
    this.userService.userItems(this.user[0].userID)
    .subscribe(
      (response) => {
        this.items = response;
        console.log(this.items);
      },
      (error) => console.log(error)
    );
  }

  nextImg(){

    if(this.i > this.items.length-1){
         this.i = 0;
     }
     else
      this.i++;
    }

    addAdmin(){
      this.adminService.addAdmin({userID: this.user[0].userID})
      .subscribe(
      (response) => { 
      },
      (error) => console.log(error));
    }

}
