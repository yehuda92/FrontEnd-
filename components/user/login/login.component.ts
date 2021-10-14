import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: any;

  onForm = true;
  onError = false;
  userID;
  you = false;
  constructor(private cookieservice: CookieService ,private userService: UserService) { }

  ngOnInit(): void {
    this.userService.cast.subscribe(u => this.you = u);
  }
  
  login(){
  
    if(this.loginForm.valid)
    {      
      this.userService.login(this.loginForm.value)
        .subscribe(
          (response) => {
            if(response != -1 && response != null)
            {
              this.userID =  response;
              this.cookieservice.set("userID",this.userID);
              this.userService.userConnected(false);
              this.onForm = false;
            }
            else
              this.onError = true;
          },
          (error)    => console.log(error)
        );  
    }
    else
    {
      console.log('email & passweord required')
    }
  }
}
