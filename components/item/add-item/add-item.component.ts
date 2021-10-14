import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  categories;
  types;
  sizes;
  form!: FormGroup;
  imagData!: string;
  
  @ViewChild('itemForm') itemForm: any;

  item: Item = {
    itemID:'',
    userID:'',
    categoryID:'',
    typeID:'',
    sizeID: '',
    image:'',
    for: '',
    note: 'לא נמסרו פרטים',
    status:''
  };
 
  on = true;
  next= false;
  constructor(private cookieservice: CookieService, private itemService: ItemService, private userService: UserService) { }

  ngOnInit(): void {
    const cookieExists:boolean=this.cookieservice.check("userID");

    if(cookieExists)
    {
      this.on = true;
    }
    else
    {
      this.on = false;
    }

    this.itemService.getCategories()
    .subscribe(
    (response) => { 
      this.categories =  response
    },
    (error) => console.log(error) );
    this.itemService.getTypes()
    .subscribe(
    (response) => { 
      this.types =  response
    },
    (error) => console.log(error) ); 

    this.itemService.getSizes()
    .subscribe(
    (response) => { 
      this.sizes =  response
    },
    (error)    => console.log(error) );

    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    })
  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement | any).files[0];
    this.form.patchValue({image: file});
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if(file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagData = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
    console.log('file selected');
  }

  createItem() {
    if(this.itemForm.valid)
    {
      this.next = true;
      this.item.userID = this.cookieservice.get("userID");
      this.item.categoryID = this.itemForm.value.category;
      this.item.typeID = this.itemForm.value.type;
      this.item.sizeID = this.itemForm.value.size;
      this.item.image = this.imagData;
      this.item.note = this.itemForm.value.note;
      this.item.for = this.itemForm.value.for;
        this.itemService.addItem(this.item)
        .subscribe(
         (response) => {},
         (error) => console.log(error) 
       ); 
    }
    else 
      console.log('NOT VALID !!!');
   }


   newItem(){
     this.on = true;
     this.next = false;
     this.itemForm.reset();
   }
}
