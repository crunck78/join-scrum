import { TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { ScrumResetPasswordService } from "../../../scrum-api/scrum-reset-password/scrum-reset-password.service";
import { FeedbackService } from "../../../shared/shared-services/feedback/feedback.service";
import { ResetPasswordService } from "./reset-password.service";

describe("ResetPasswordService", () => {
	let service: ResetPasswordService;
	const openSnackBar = vi.fn();
	const resetPassword$ = vi.fn();
	const queryParams = new BehaviorSubject({ token: "" });

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ResetPasswordService,
				{ provide: ActivatedRoute, useValue: { queryParams } },
				{ provide: FeedbackService, useValue: { openSnackBar } },
				{ provide: ScrumResetPasswordService, useValue: { resetPassword$ } },
			],
		});
		service = TestBed.inject(ResetPasswordService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("resetPassword$", () => {
		it("should openSnackBar on success resetPassword$", () => {
			resetPassword$.mockReturnValue(of(true));

			service.resetPassword("somepassword");

			expect(openSnackBar).toHaveBeenCalled();
		});
	});
});
