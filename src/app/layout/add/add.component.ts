import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../user.service';
import { UserList } from '../../user-list';
import { UserAdd } from '../../user-add';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  animations: [routerTransition()]
})
export class AddComponent implements OnInit {

    constructor(private userService: UserService) {}


    add(name: string, job: string): void {
        name = name.trim();
        job = job.trim();

        this.userService.addUser({ name, job} as UserAdd).subscribe();
      }

  ngOnInit() {
  }

}
