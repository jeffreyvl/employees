import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserEdit} from '../../user-edit';
import { EditResponse } from '../../response-edit';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() user: User;
  error: string;
  response: EditResponse;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserById()
  }

    getUserById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id)
      .subscribe(user => this.user = user);
  }
  
  editUserByName(first_name: string, last_name: string): void {
    first_name = first_name.trim();
    last_name = last_name.trim();

    this.error = '';
    this.userService.editUser({ first_name, last_name} as UserEdit).subscribe(x => this.response = x);
  }  

}