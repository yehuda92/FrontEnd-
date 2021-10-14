import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  messages;
  isSpecial = false;
  userName;
  openMessage = -1;

  constructor(private cookieservice: CookieService, private userService: UserService) {
   }

    ngOnInit(): void {
      this.userMessages();
    }

    userMessages(){
      this.userService.getUserMessages(this.cookieservice.get("userID"))
      .subscribe(
      (response) => { 
        this.messages =  response;
      },
      (error) => console.log(error) );
    }

    showMessage(i){
      console.log(i)
      if(this.openMessage === -1)
         this.openMessage = i;
      else
         this.openMessage = -1;
    }

    markAsRead(index){
      this.userService.markAsRead({userID: this.cookieservice.get("userID"), messageID: this.messages[index].messageID})
      .subscribe(
      (response) => { 
        this.messages =  response;
      },
      (error) => console.log(error));
    }

    deleteMessage(index){
      this.userService.deleteMessage({userID: this.cookieservice.get("userID"),messageID: this.messages[index].messageID})
      .subscribe(
      (response) => { 
        this.messages =  response;
      },
      (error) => console.log(error));
    }

  }

