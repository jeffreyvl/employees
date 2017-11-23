import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import {User} from '../../model/user';
import { filter } from 'rxjs/operators/filter';

import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../service/user.service';
import { routerTransition } from '../../router.animations';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { MessageService } from '../../service/message.service';
import { ErrorService } from '../../service/error.service';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EditRoutingModule } from './edit-routing.module';
import { PageHeaderModule } from '../components/page-header/page-header.module';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  let activatedRouteStub = {
    isLoggedIn: true,
    user: {name: 'Test User'}
   };

   let locationStub = {
    
    };
    
    let userServiceStub = {
      editUser(user: User): Observable<User> {
        let userSubject = new Subject();
        userSubject.next({id: 1, first_name: "Hans", last_name: "Rijs", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"});
        return userSubject;
      }
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent, PageHeaderComponent ],
      imports:[FormsModule,TranslateModule, CommonModule, EditRoutingModule, NgModule],
      providers: [{ActivatedRoute, useValue: activatedRouteStub}, {provide: UserService, userValue: userServiceStub}, 
      {provide: Location, useValue: locationStub}]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fdescribe('Method editUser', function() {
    it('should edit an user', function() {
      
      component.edit("firstName", "lastName", 2 );
      expect(component.user.firstName).toEqual('Hans');
    });
  });

});
