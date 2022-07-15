import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersBarComponent } from './members-bar.component';

describe('MembersBarComponent', () => {
  let component: MembersBarComponent;
  let fixture: ComponentFixture<MembersBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
