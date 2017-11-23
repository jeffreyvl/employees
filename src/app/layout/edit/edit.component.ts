import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { routerTransition } from '../../router.animations';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../../service/message.service';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
})
export class EditComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private errorService: ErrorService,
    private messageService: MessageService
  ) {}

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => (this.user = user));
  }

  edit(firstName: string, lastName: string, id: number): void {
    firstName = firstName.trim();
    lastName = lastName.trim();

    if (!firstName || !lastName) {
      this.errorService.add('Please fill in all the fields');
      return;
    }

    // method altered for testing purpose
    this.userService.editUser({ firstName, lastName, id } as User).subscribe(x => {
        this.user.firstName = firstName;
        this.user.lastName = lastName;
        this.user.id = id;
        const timeStamp = new Date(x.updatedAt).toLocaleString();
        const temp = `Updated user to ${x.firstName} ${x.lastName} at ${timeStamp}`;
        this.messageService.add(temp);
    });
  }


  ngOnInit() {
    this.getUser();
  }
}
