import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
   this.allUsers();
  }


  allUsers(){
    this.adminService.getAllUsers()
    .subscribe(
      (response) => {
       this.users = response;
       console.log(this.users);
      },
      (error)    => console.log(error)
    );  
  }


  getUserID(i){
    this.adminService.setUserID(this.users[i].userID)
  }
}
