import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { BoardComponent } from "./board.component";

describe("BoardComponent", () => {
	let component: BoardComponent;
	let fixture: ComponentFixture<BoardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule, MaterialModule)],
		}).compileComponents();

		fixture = TestBed.createComponent(BoardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
