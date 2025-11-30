import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { MaterialModule } from "../../shared/modules/material/material.module";
import { ScrumLoginService } from "./scrum-login.service";

describe("ScrumLoginService", () => {
	let service: ScrumLoginService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule, MaterialModule)],
		});
		service = TestBed.inject(ScrumLoginService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
