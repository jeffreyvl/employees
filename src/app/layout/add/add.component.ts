import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../user.service';
import { UserList } from '../../user-list';
import { ErrorService } from '../../error.service';
import { MessageService } from '../../message.service';
import { User } from '../../user';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    animations: [routerTransition()]
})
export class AddComponent implements OnInit {
    error: string;

    constructor(private errorService: ErrorService, private userService: UserService, private messageService: MessageService) { }


    add(name: string, job: string): void {
        name = name.trim();
        job = job.trim();

        if (!name || !job) {
            this.clear();
            this.errorService.add('Please fill in all the fields');
            return;
        }
        this.clear();

        this.userService.addUser({ name, job } as User).subscribe(x => {
            const temp = `Created user ${x.name} with id ${x.id} and job ${x.job} at ${x.createdAt}`;
            this.messageService.add(temp);
        });
    }

    private clear() {
        this.messageService.clearLatest();
        this.errorService.clearLatest();
    }

    ngOnInit() {
        this.clear();
    }

}
