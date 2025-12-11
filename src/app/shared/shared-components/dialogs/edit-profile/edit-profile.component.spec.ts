import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { EditProfileComponent } from "./edit-profile.component";

describe("EditProfileComponent", () => {
	let component: EditProfileComponent;
	let fixture: ComponentFixture<EditProfileComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [EditProfileComponent],
			providers: [
				{
					provide: MatDialogRef,
					useValue: {},
				},
			],
		});
		fixture = TestBed.createComponent(EditProfileComponent);
		fixture.autoDetectChanges();
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
