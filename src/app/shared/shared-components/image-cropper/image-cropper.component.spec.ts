import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageCropperComponent } from './image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { importProvidersFrom } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';

describe('ImageCropperComponent', () => {
  let component: ProfileImageCropperComponent;
  let fixture: ComponentFixture<ProfileImageCropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ImageCropperModule ],
      providers: [
        importProvidersFrom(MaterialModule)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileImageCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
