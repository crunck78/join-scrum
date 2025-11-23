import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { AddListComponent } from "./add-list.component";

describe("AddListComponent", () => {
	let component: AddListComponent;
	let fixture: ComponentFixture<AddListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				importProvidersFrom(
					BrowserAnimationsModule,
					HttpClientModule,
					MaterialModule,
				),
				{ provide: MatDialogRef, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AddListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
