import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  item;

  constructor(private itemService: ItemService) { }
  
  ngOnInit(): void {
    this.item = this.itemService.getItem();
  }


  addToMyCart(){
    this.itemService.addToMyItems(this.item);
  }


}
