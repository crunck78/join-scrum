import { AfterViewInit, Component, ComponentRef, ElementRef, Optional, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, ImageCropperModule, LoadedImage } from 'ngx-image-cropper';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material/material.module';
import { FileItem, FileUploadModule, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { PROFILE_IMAGE_ENDPOINT } from 'src/app/scrum-api/scrum-profile/scrum-profile.service';
import { ScrumApiService } from 'src/app/scrum-api/scrum-api.service';

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
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private sanitizer: DomSanitizer,
    private scrumApi: ScrumApiService,
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

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log(this.hasBaseDropZoneOver);
  }

  fileDropBase(event: File[]) {
    this.fileToChange = event[0];
  }

  fileChangeEvent(event: any): void {
    debugger;
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
    this.imageCropper.hidden = false;
  }

  cropperReady() {

  }

  loadImageFailed() {

  }

  saveImage() {
    this.uploader.queue[0].upload();
    this.uploader.queue[0].onSuccess = () => {
      this.dialogRef?.close(true);
    }
  }
}
