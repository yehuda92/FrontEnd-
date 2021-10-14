import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  @ViewChild('updateForm') updateForm: any;

  on = true;
  user: any;
  constructor(private cookieservice: CookieService,private userService: UserService) { 
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser()
    .subscribe(
      (response) => {
        this.user = response;
      },
      (error) => console.log(error)
    ); 
  }

  update(){
    if(this.updateForm.valid)
    {
    this.on = false;
    this.userService.update({
    userID:  this.cookieservice.get("userID"),
    firstName: this.updateForm.value.firstName,
    lastName:  this.updateForm.value.lastName,
    phoneNumber: this.updateForm.value.phoneNumber,
    password: this.updateForm.value.password
    }).subscribe(
        (response) => {},
        (error)    => console.log(error)
      );   
    }
    else
    {
      console.log('email & passweord required')
    }
  }
}
