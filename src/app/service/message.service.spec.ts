import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

fdescribe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it(
    'should be created',
    inject([MessageService], (service: MessageService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should return latest message added',
    inject([MessageService], (service: MessageService) => {
      let message: string;
      service.messageStream.subscribe(x => (message = x));
      service.add('test');
      expect(message).toEqual('test');
    })
  );

  it(
    'should clear latest message',
    inject([MessageService], (service: MessageService) => {
      let message: string;
      service.messageStream.subscribe(x => (message = x));
      service.add('test');
      service.clear();
      expect(message).toEqual(undefined);
    })
  );
});
