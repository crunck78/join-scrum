import { Component, ElementRef, Optional, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageCropperModule, LoadedImage } from 'ngx-image-cropper';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material/material.module';
import { FileUploadModule, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { PROFILE_IMAGE_ENDPOINT } from 'src/app/scrum-api/scrum-profile/scrum-profile.service';
import { ScrumApiService } from 'src/app/scrum-api/scrum-api.service';
import { FeedbackService } from '../../shared-services/feedback/feedback.service';

const URL = PROFILE_IMAGE_ENDPOINT;

@Component({
  selector: 'app-image-cropper',
  standalone: true,
  imports: [CommonModule, ImageCropperModule, DialogComponent, MaterialModule, FileUploadModule],
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ProfileImageCropperComponent {
  @ViewChild('inputImage') inputImage!: ElementRef<HTMLInputElement>;
  @ViewChild('imageCropper') imageCropper!: ImageCropperComponent;

  uploader!: FileUploader;
  hasBaseDropZoneOver!: boolean;
  response!: string;
  fileToChange !: File;
  fileToUpload !: File | Blob | string | undefined | null;
  imageChangedEvent !: Event;
  croppedImage: SafeUrl = '';

  constructor(
    private sanitizer: DomSanitizer,
    private scrumApi: ScrumApiService,
    private feedbackService: FeedbackService,
    @Optional() private dialogRef?: MatDialogRef<ImageCropperComponent>
  ) {
    this.uploader = new FileUploader({
      url: URL,
      authToken: `Token ${this.scrumApi.token}`,
      disableMultipart: false, // Enable multipart
      itemAlias: 'image', // This should match the name expected on the server side
    } as FileUploaderOptions);
    this.hasBaseDropZoneOver = false;
    this.response = '';
    this.uploader.response.subscribe(res => this.response = res);
  }

  fileOverBase(e: boolean): void {
    console.log(typeof e)
    this.hasBaseDropZoneOver = e;
  }

  fileDropBase(event: File[]) {
    this.fileToChange = event[0];
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    // Convert the blob to a file
    const blobToFile = (blob: Blob, name: string): File => {
      const file = new File([blob], name, { type: blob.type });
      return file;
    };

    // Create a file from the cropped image blob
    const croppedFile = blobToFile(event.blob as Blob, "profile.png"); // You can dynamically generate or allow the user to input a filename
    // Instead of directly manipulating the queue
    this.uploader.clearQueue();
    this.uploader.addToQueue([croppedFile]);
    // this.uploader.queue = [fileItem];
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl as string);
    // event.blob can be used to upload the cropped image
  }

  imageLoaded(image: LoadedImage) {
    console.log(image);
    this.imageCropper.hidden = false;
  }

  cropperReady(dimensions: Dimensions) {
    console.log(dimensions);
  }

  loadImageFailed() {
    this.feedbackService.openSnackBar(
      "Failed to load the image. Please ensure the file is a supported format like PNG or JPG.",
      "Close",
      {}, false
    );
  }

  saveImage() {
    this.uploader.queue[0].upload();
    this.uploader.queue[0].onSuccess = () => this.dialogRef?.close(true);
    this.uploader.queue[0].onError = (response) => {
      const responseJSON = JSON.parse(response);
      this.feedbackService.openSnackBar(`${responseJSON.detail || 'Something went wrong!'}`, 'Close')
    };
  }
}
