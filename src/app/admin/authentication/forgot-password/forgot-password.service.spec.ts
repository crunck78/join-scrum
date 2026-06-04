import { TestBed } from "@angular/core/testing";
import { of, Subject } from "rxjs";
import { ScrumForgotPasswordService } from "../../../scrum-api/scrum-forgot-password/scrum-forgot-password.service";
import { BreakpointsService } from "../../../shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "../../../shared/shared-services/feedback/feedback.service";
import { ForgotPasswordService } from "./forgot-password.service";

describe("ForgotPasswordService", () => {
	let service: ForgotPasswordService;
	const matchesWebBreakpoint$ = new Subject<boolean>();
	const sendMail$ = vi.fn();
	const openSnackBar = vi.fn();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: BreakpointsService,
					useValue: { matchesWebBreakpoint$ },
				},
				{
					provide: ScrumForgotPasswordService,
					useValue: { sendMail$ },
				},
				{
					provide: FeedbackService,
					useValue: { openSnackBar },
				},
			],
		});
		service = TestBed.inject(ForgotPasswordService);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should open snack bar on successful mail send", () => {
		sendMail$.mockReturnValue(of(true));

		service.sendMail({ email: "test@example.com" });
		expect(openSnackBar).toHaveBeenCalledOnce();
	});

	it("should not open snack bar on failed mail send", () => {
		sendMail$.mockReturnValue(of(false));

		service.sendMail({ email: "test@example.com" });
		expect(openSnackBar).toHaveBeenCalledTimes(0);
	});
});
