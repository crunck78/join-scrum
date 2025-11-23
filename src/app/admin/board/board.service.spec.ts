import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { BoardService } from "./board.service";

describe("BoardService", () => {
	let service: BoardService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule, MaterialModule)],
		});
		service = TestBed.inject(BoardService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
