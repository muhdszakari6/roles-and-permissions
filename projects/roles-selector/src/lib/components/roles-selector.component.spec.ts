import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesSelectorComponent } from './roles-selector.component';

describe('RolesSelectorComponent', () => {
  let component: RolesSelectorComponent;
  let fixture: ComponentFixture<RolesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
