import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-rr-hh',
  templateUrl: './rr-hh.component.html',
  styleUrls: ['./rr-hh.component.css']
})
export class RrHhComponent implements OnInit {
  displayedColumns: string[] = ['nombreCompleto', 'userName', 'groups'];
  dataSource: any[] = [];
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAll()
      .subscribe((data: any) =>{
        console.log(data);
        this.dataSource = data;
      }, error => {
        console.log(error);
      })
  }

}
