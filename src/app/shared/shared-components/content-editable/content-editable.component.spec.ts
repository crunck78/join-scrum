import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditableComponent } from './content-editable.component';

describe('ContentEditableComponent', () => {
  let component: ContentEditableComponent;
  let fixture: ComponentFixture<ContentEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ContentEditableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
