import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../user.service';
import { UserList } from '../../user-list';
import { UserAdd } from '../../user-add';
import { AddResponse } from '../../response-add';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  animations: [routerTransition()]
})
export class AddComponent implements OnInit {
    error: string;
    response: AddResponse;
    constructor(private userService: UserService) {}


    add(name: string, job: string): void {
        name = name.trim();
        job = job.trim();

        if (!name || !job) {
            this.response = undefined;
            this.error = 'Please fill in all the fields!';
            return;
        }
        this.error = '';
        this.userService.addUser({ name, job} as UserAdd).subscribe(x => this.response = x);
      }

  ngOnInit() {
  }

}
