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
  currentPage = 1;

  constructor(private userService: UserService) {}

  getUsers(page: number): void {
    this.userService.getUsers(page).subscribe(x => {
      this.userList = x;
      this.pages = new Array(x.total_pages);
      for (let i = 0; i < this.pages.length; i++) {
        this.pages[i] = i + 1;
      }
    });
  }

  changePage(i: number) {
      if (i > 0 && i <= this.userList.total_pages) {
        this.currentPage = i;
        this.getUsers(i);
      }
  }

  delete(id: number) {
        this.userList.data = this.userList.data.filter(x => x.id !== id);
        this.userService.delUser(id).subscribe();
  }
  ngOnInit() {
    this.getUsers(this.currentPage);
  }
}