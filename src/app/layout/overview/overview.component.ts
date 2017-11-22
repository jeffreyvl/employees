import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Response } from '../../model/response';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [routerTransition()]
})

export class OverviewComponent implements OnInit {
  pages: number[];
  currentPage = 1;
  response: Response;
  constructor(private userService: UserService) {}

  getUsers(page: number): void {

    this.userService.getUsers(page).subscribe(x => {
        this.response = x;
      this.pages = new Array(x.totalPages);
      for (let i = 0; i < this.pages.length; i++) {
        this.pages[i] = i + 1;
      }
    });
  }

  changePage(i: number) {
      if (i > 0 && i <= this.response.totalPages) {
        this.currentPage = i;
        this.getUsers(i);
      }
  }

  delete(id: number) {
        this.response.users = this.response.users.filter(x => x.id !== id);
        this.userService.delUser(id).subscribe();
  }
  ngOnInit() {
    this.getUsers(this.currentPage);
  }
}
