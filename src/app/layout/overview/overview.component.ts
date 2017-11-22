import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../user.service';
import { UserList } from '../../user-list';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private location: Location
) {}

  getUsers(): void {
    const page = +this.route.snapshot.paramMap.get('page');
    this.currentPage = page;

    this.userService.getUsers(this.currentPage).subscribe(x => {
      this.userList = x;
      this.pages = new Array(x.total_pages);
      for (let i = 0; i < this.pages.length; i++) {
        this.pages[i] = i + 1;
      }
    });
  }

  ngOnInit() {
    this.getUsers();
  }
}
