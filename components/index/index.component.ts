import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  items: any;

  constructor(private itemService: ItemService, private userService: UserService) { }

  ngOnInit(): void {
    this.itemService.getItems()
    .subscribe(
    (response) => { 
      this.items =  response
    },
    (error)    => console.log(error) ); 
  }

  sendItem(item: any) {
    this.itemService.selectedItem(item);
  }
  

}
