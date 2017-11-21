import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../user.service';
import { UserList } from '../../user-list';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [routerTransition()]
})
export class OverviewComponent implements OnInit {
  userList: UserList;
  pages: number[];

  constructor(private userService: UserService) {}

  getUsers(): void {
    this.userService.getUsers().subscribe(x => {
      this.userList = x;
      this.pages = new Array[x.total_pages]();
      for (let i = 1; i < this.pages.length; i++) {
        this.pages[i] = i + 1;
      }
    });
  }
  ngOnInit() {
    this.getUsers();
  }
}
