import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskComponent } from './subtask.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { ContentEditableComponent } from 'src/app/shared/shared-components/content-editable/content-editable.component';

describe('SubtaskComponent', () => {
  let component: SubtaskComponent;
  let fixture: ComponentFixture<SubtaskComponent>;
  const subtask = {
    title: "Some Title",
    done: false
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtaskComponent ],
      imports: [MaterialModule, ContentEditableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtaskComponent);
    component = fixture.componentInstance;
    component.subtask = subtask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
