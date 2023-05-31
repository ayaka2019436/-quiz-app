import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolberComponent } from './toolber.component';

describe('ToolberComponent', () => {
  let component: ToolberComponent;
  let fixture: ComponentFixture<ToolberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
