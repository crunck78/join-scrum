import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { ScrumSignupService } from "../../../scrum-api/scrum-signup/scrum-signup.service";
import { BreakpointsService } from "../../../shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "../../../shared/shared-services/feedback/feedback.service";
import { RegisterService } from "./register.service";

describe("RegisterService", () => {
	let service: RegisterService;
	const navigate = vi.fn();
	const openSnackBar = vi.fn();
	const signup$ = vi.fn();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RegisterService,
				{ provide: Router, useValue: { navigate } },
				{ provide: FeedbackService, useValue: { openSnackBar } },
				{ provide: ScrumSignupService, useValue: { signup$ } },
				{ provide: BreakpointsService, useValue: {} },
			],
		});

		service = TestBed.inject(RegisterService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	const singUpScenarios = [
		{
			success: true,
			expectedNavigationCalls: 1,
			description: "successful signup",
		},
		{
			success: false,
			expectedNavigationCalls: 0,
			description: "failed signup",
		},
	];

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("signUp", () => {
		it.each(singUpScenarios)("should $description", ({
			success,
			expectedNavigationCalls,
		}) => {
			signup$.mockReturnValueOnce(of(success));

			service.signUp({ email: "", name: "", password: "" });

			expect(navigate).toHaveBeenCalledTimes(expectedNavigationCalls);
			expect(openSnackBar).toHaveBeenCalledTimes(1);
		});
	});
});
