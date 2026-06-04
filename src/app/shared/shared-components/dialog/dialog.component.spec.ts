import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getElement } from "../../../testing/fixtures";
import { DialogComponent } from "./dialog.component";

@Component({
	standalone: true,
	imports: [DialogComponent],
	template: `
	<app-dialog [title]="'Test title'">
		<ng-container side>
			Side content
		</ng-container>
		<ng-container titleContentLeft>
			Title content left
		</ng-container>
		<ng-container titleContentRight>
			Title content right
		</ng-container>
		<ng-container actions>
			Actions
		</ng-container>
	</app-dialog>`,
})
class TestHostComponent {}

describe("DialogComponent", () => {
	let component: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [DialogComponent, TestHostComponent],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should display contents and title", () => {
		const titleContent = getElement(fixture, ".title-content");
		expect(titleContent.innerText).toContain("Title content left");
		expect(titleContent.innerText).toContain("Test title");
		expect(titleContent.innerText).toContain("Title content right");
	});
});
