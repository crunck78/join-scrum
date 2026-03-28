import { CommonModule } from "@angular/common";
import { Component, type ElementRef, inject, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer, type SafeUrl } from "@angular/platform-browser";
import { FileUploader, FileUploadModule } from "ng2-file-upload";
import { ImageCropperComponent } from "ngx-smart-cropper";
import { ScrumApiService } from "../../../scrum-api/scrum-api.service";
import { PROFILE_IMAGE_ENDPOINT } from "../../../scrum-api/scrum-profile/scrum-profile.service";
import { MaterialModule } from "../../modules/material/material.module";
import { FeedbackService } from "../../shared-services/feedback/feedback.service";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
	selector: "app-image-cropper",
	imports: [
		CommonModule,
		ImageCropperComponent,
		DialogComponent,
		MaterialModule,
		FileUploadModule,
	],
	templateUrl: "./image-cropper.component.html",
	styleUrls: ["./image-cropper.component.scss"],
})
export class ProfileImageCropperComponent {
	private sanitizer = inject(DomSanitizer);
	private scrumApi = inject(ScrumApiService);
	private feedbackService = inject(FeedbackService);
	private dialogRef = inject<MatDialogRef<ImageCropperComponent, boolean>>(
		MatDialogRef,
		{ optional: true },
	);

	@ViewChild("inputImage") inputImage!: ElementRef<HTMLInputElement>;
	@ViewChild("imageCropper") imageCropper!: ImageCropperComponent;

	uploader: FileUploader;
	hasBaseDropZoneOver!: boolean;
	response!: string;
	fileToChange!: File;
	fileToUpload!: File | Blob | string | undefined | null;
	imageChangedEvent!: Event;
	croppedImage: SafeUrl = "";

	constructor() {
		this.uploader = new FileUploader({
			url: PROFILE_IMAGE_ENDPOINT,
			authToken: `Token ${this.scrumApi.token}`,
			disableMultipart: false, // Enable multipart
			itemAlias: "image", // This should match the name expected on the server side
		});
		this.hasBaseDropZoneOver = false;
		this.response = "";
		this.uploader.response.subscribe((res) => (this.response = res));
	}

	fileOverBase(e: boolean): void {
		this.hasBaseDropZoneOver = e;
	}

	fileDropBase(event: File[]) {
		this.fileToChange = event[0];
	}

	fileChangeEvent(event: Event): void {
		this.imageChangedEvent = event;
	}

	imageSource: string | null = null;

	onFileChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const file = input.files[0];
		const reader = new FileReader();
		reader.onload = (e: any) => (this.imageSource = e.target.result);
		reader.readAsDataURL(file);
	}

	imageCropped(event: string) {
		// Convert Base64 string to a Blob
		const base64ToBlob = (
			base64: string,
			contentType: string = "",
			sliceSize: number = 512,
		): Blob => {
			const byteCharacters = atob(base64.split(",")[1]);
			const byteArrays = [];

			for (
				let offset = 0;
				offset < byteCharacters.length;
				offset += sliceSize
			) {
				const slice = byteCharacters.slice(offset, offset + sliceSize);
				const byteNumbers = new Array(slice.length);
				for (let i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				}
				const byteArray = new Uint8Array(byteNumbers);
				byteArrays.push(byteArray);
			}

			return new Blob(byteArrays, { type: contentType });
		};
		// Convert the Base64 string to a Blob
		const blob = base64ToBlob(event, "image/png");
		// Convert the blob to a file
		const blobToFile = (blob: Blob, name: string): File => {
			const file = new File([blob], name, { type: blob.type });
			return file;
		};

		// Create a file from the cropped image blob
		const croppedFile = blobToFile(blob, "profile.png"); // You can dynamically generate or allow the user to input a filename
		// Instead of directly manipulating the queue
		this.uploader.clearQueue();
		this.uploader.addToQueue([croppedFile]);
		// this.uploader.queue = [fileItem];
		this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event);
		// event.blob can be used to upload the cropped image
	}

	loadImageFailed() {
		this.feedbackService.openSnackBar(
			"Failed to load the image. Please ensure the file is a supported format like PNG or JPG.",
			"Close",
			{},
			false,
		);
	}

	saveImage() {
		this.uploader.queue[0].upload();
		this.uploader.queue[0].onSuccess = () => this.dialogRef?.close(true);
		this.uploader.queue[0].onError = (response) => {
			const responseJSON = JSON.parse(response);
			this.feedbackService.openSnackBar(
				`${responseJSON.detail || "Something went wrong!"}`,
				"Close",
			);
		};
	}
}
