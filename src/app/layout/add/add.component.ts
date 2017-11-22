import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { ErrorService } from '../../service/error.service';
import { MessageService } from '../../service/message.service';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  animations: [routerTransition()]
})
export class AddComponent implements OnInit {
  error: string;

  constructor(
    private errorService: ErrorService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  add(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();

    if (!firstName || !lastName) {
      this.errorService.add('Please fill in all the fields');
      return;
    }

    this.userService.addUser({ firstName, lastName } as User).subscribe(x => {
        const timeStamp = new Date(x.createdAt).toLocaleString();
        const temp = `Created user ${x.firstName} ${x.lastName} with id ${x.id} at ${timeStamp}`;
        this.messageService.add(temp);
    });
  }


  ngOnInit() {
  }
}
