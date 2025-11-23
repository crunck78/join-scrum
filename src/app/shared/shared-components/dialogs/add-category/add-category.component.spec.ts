import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { AddCategoryComponent } from "./add-category.component";

describe("AddCategoryComponent", () => {
	let component: AddCategoryComponent;
	let fixture: ComponentFixture<AddCategoryComponent>;

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

		fixture = TestBed.createComponent(AddCategoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
