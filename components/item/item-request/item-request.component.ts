import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item-request',
  templateUrl: './item-request.component.html',
  styleUrls: ['./item-request.component.scss']
})
export class ItemRequestComponent implements OnInit {

  itemID;
  item:any;
  on = false;

  @ViewChild('requestForm') requestForm: any;


  constructor(private itemService: ItemService, private userService: UserService) { 
    this.itemID = this.itemService.getItemID();
  }

  ngOnInit(): void {
  }

  sendRequest(){
    if(this.requestForm.valid)
    {
      this.itemService.getItemByID(this.itemID)
      .subscribe(
        (response) => {
           this.userService.createMessage({
             firstName:this.requestForm.value.firstName,
             lastName:this.requestForm.value.lastName,
             email:this.requestForm.value.email,
             destination: response[0].userID,
             subject: response[0].itemID,
             message: this.requestForm.value.note
              })
           .subscribe(
            (response) => { 
              this.on = true;
            },
            (error)    => console.log(error)
          );
        },
        (error)    => console.log(error)
      );  
    }
    else 
      console.log('NOT VALID !!!');
   }

   removeFromCart(){
     this.itemService.removeFromCart(this.itemID);
   }
}


