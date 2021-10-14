import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  @ViewChild('deleteForm') deleteForm: any;

  constructor(private cookieservice: CookieService, private userService: UserService) { }

  on = true;
  ngOnInit(): void {
  }

  delete(){
    
    if(this.deleteForm.valid)
    {
      const password = String(this.deleteForm.value.password);
      this.userService.deleteUser({password:  password, userID: this.cookieservice.get("userID")})
     .subscribe(
      (response) => { 
        if(response == -1) 
        {
            this.cookieservice.delete("userID");
            this.userService.userConnected(true);
            this.on = false;
        }
        else 
            this.on = true;
      },
      (error)    => console.log(error));      
    }
    else
    {
      console.log('passweord required')
    }
  }
  
}
