import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  logOutIcon = false;
  title = "";

  constructor(private cookieservice:CookieService, private userService: UserService) {

   
  }

  ngOnInit(): void {

    this.getTime(); 
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

  getTime(){
    var time = new Date();
    if(time.getHours() >= 12 && time.getHours() < 18)
    {
      this.title = "צהריים טובים";
    }
    else if(time.getHours() >= 18 && time.getHours() < 24)
    {
      this.title = "ערב טוב";
    }
    else if(time.getHours() >= 1 && time.getHours() < 5)
    {
      this.title = "לילה טוב";
    }
    else 
      this.title = "בוקר טוב";
  }

  onActiveLogOut() {

    console.log('logout')
       var logOut = confirm("Are you sure you want to log out?");
       if (logOut) {
        this.cookieservice.delete("userID");
        this.userService.userConnected(true);
         }  
       } 
}

