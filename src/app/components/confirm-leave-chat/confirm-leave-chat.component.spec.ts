import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLeaveChatComponent } from './confirm-leave-chat.component';

describe('ConfirmLeaveChatComponent', () => {
  let component: ConfirmLeaveChatComponent;
  let fixture: ComponentFixture<ConfirmLeaveChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmLeaveChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmLeaveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
