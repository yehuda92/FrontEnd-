import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  
  @ViewChild('systemMessages') systemMessages: any;

  next = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  sendEmail(){
    if(this.systemMessages.valid)
    {
      this.userService.sendEmails(this.systemMessages.value)
      .subscribe(
      (response) => { 
        this.next = true;
      },
      (error)    => console.log(error) );
    }
  }

}
