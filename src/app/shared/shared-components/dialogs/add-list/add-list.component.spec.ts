import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject, of } from "rxjs";
import {
	clickElement,
	createBoardResponse,
	createListResponse,
} from "../../../../testing/fixtures";
import { BoardResponse } from "../../../models/board.model";
import { AddListComponent } from "./add-list.component";
import { AddListService } from "./add-list.service";

const newList = {
	name: "TODO",
	board: 1,
};

describe("AddListComponent", () => {
	let component: AddListComponent;
	let fixture: ComponentFixture<AddListComponent>;
	const addList$ = vi.fn();
	const boards$ = new BehaviorSubject<BoardResponse[]>([createBoardResponse()]);

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AddListComponent],
			providers: [
				{ provide: MatDialogRef, useValue: { close: vi.fn() } },
				{ provide: AddListService, useValue: { addList$, boards$ } },
			],
		});
		fixture = TestBed.createComponent(AddListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should close dialog with new list", () => {
		addList$.mockReturnValue(of(createListResponse(newList)));
		component.addListForm.setValue(newList);

		fixture.detectChanges();

		component.addList();

		expect(addList$).toHaveBeenCalledWith(newList);
	});

	it("should call addList on button click", () => {
		const addListSpy = vi.spyOn(component, "addList");
		component.addListForm.setValue(newList);
		fixture.detectChanges();
		clickElement(fixture, "button[aria-label='Create List']");
		expect(addListSpy).toHaveBeenCalledOnce();
	});
});
