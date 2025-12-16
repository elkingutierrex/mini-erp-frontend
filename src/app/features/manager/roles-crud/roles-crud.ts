import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockDbService } from '../../../core/services/mock-db.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, FormsModule],
  selector: 'app-roles-crud',
  templateUrl: './roles-crud.html',
  styleUrls: ['./roles-crud.scss']
})
export class RolesCrud implements OnInit {
  users: any[] = [];
  constructor(private db: MockDbService) {}
  ngOnInit(){ this.db.getUsers().subscribe(u=>this.users=u); }
  save(u:any){
    this.db.updateUser(u).subscribe(()=> alert('Guardado'));
  }
}
