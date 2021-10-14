import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-m-management',
  templateUrl: './m-management.component.html',
  styleUrls: ['./m-management.component.scss']
})
export class MManagementComponent implements OnInit {



  constructor(private adminService: AdminService) { }

  ngOnInit(): void {

  }

 

}
