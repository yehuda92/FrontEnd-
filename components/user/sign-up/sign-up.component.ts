import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @ViewChild('signUpForm') signUpForm: any;
  
  onForm = true;
  userID;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  signUp(){
    if(this.signUpForm.valid)
    {
      this.userService.signUp(this.signUpForm.value)
      .subscribe(
        (response) => { 
          if(response != -1)
          {
            this.onForm = false;
          }
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
