import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { routerTransition } from '../../router.animations';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserEdit} from '../../user-edit';
import { EditResponse } from '../../response-edit';
import { MessageService } from '../../message.service';
import { UserAdd } from '../../user-add';
import { ErrorService } from '../../error.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
})
export class EditComponent implements OnInit {
  @Input() user: User;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private errorService: ErrorService,
    private messageService: MessageService
  ) { }

    getUserById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id)
      .subscribe(user => this.user = user);
  }
  
  editEmployee(name: string, job: string): void {
    name = name.trim();
    job = job.trim();

    if (!name || !job) {
      this.clear();
      this.errorService.add('Please fill in all the fields');
      return;
  }
  this.clear();

  this.userService.editUser({ name, job } as UserEdit).subscribe(x => {
      const temp = `Created user ${x.name} with job ${x.job} at ${x.updatedAt}`;
      this.messageService.add(temp);
  });
}
    private clear() {
      this.messageService.clearLatest();
      this.errorService.clearLatest();
    }

  ngOnInit() {
    this.getUserById()
    this.clear();
  }
}
