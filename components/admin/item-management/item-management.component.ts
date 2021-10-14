import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss']
})
export class ItemManagementComponent implements OnInit {

  @ViewChild('addCatgoryForm') addCatgoryForm: any;
  @ViewChild('addTypeForm') addTypeForm: any;
  @ViewChild('addSizeForm') addSizeForm: any;

  categories;
  types;
  sizes;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {

  }

  

  addCatgory(){
    if(this.addCatgoryForm.valid){
      this.adminService.addCatgory({catgory: this.addCatgoryForm.value.catgory})
     .subscribe(
      (response) => { },
      (error)    => console.log(error));      
    }
    else
    {
      console.log('required')
    }
  }

  
  addType(){
    if(this.addTypeForm.valid){
      this.adminService.addType({type: this.addTypeForm.value.type})
      .subscribe(
       (response) => { },
       (error)    => console.log(error));      
     }
     else
     {
       console.log('required')
     }
  }

  
  addSize(){
    if(this.addSizeForm.valid){
   
      this.adminService.addSize({size: this.addSizeForm.value.size})
      .subscribe(
       (response) => { },
       (error)    => console.log(error));      
     }
     else
     {
       console.log('required')
     }
  }


}
