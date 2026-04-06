import type {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpRequest,
} from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, throwError, type Observable } from "rxjs";
import {
	DURATION_SNACK_BAR,
	FeedbackService,
} from "../shared/shared-services/feedback/feedback.service";
import { ScrumApiService } from "./scrum-api.service";

@Injectable()
export class ErrorCatchingInterceptor {
	private feedback = inject(FeedbackService);
	private scrumApi = inject(ScrumApiService);

	intercept(
		httpRequest: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		return next.handle(httpRequest).pipe(
			catchError((errorResponse: HttpErrorResponse) => {
				this._handleErrorResponse(errorResponse);
				return throwError(() => errorResponse);
			}),
		);
	}

	private _handleErrorResponse(errorResponse: HttpErrorResponse) {
		const errors: string[] = [];
		if (errorResponse.status === 401) {
			this.scrumApi.logout();
		} else if (
			this._isUnknownError(errorResponse) ||
			this._isServerError(errorResponse)
		) {
			errors.push(this._getErrorMessage(errorResponse));
		} else if (this._isBadRequest(errorResponse)) {
			for (const key in errorResponse.error) {
				if (!Object.hasOwn(errorResponse.error, key)) continue;

				const errorContent = errorResponse.error[key];
				if (Array.isArray(errorContent)) {
					errorContent.forEach((errMessage) => {
						errors.push(`${key.toUpperCase()}: ${errMessage}`);
					});
					continue;
				}
				if (typeof errorContent === "string") {
					errors.push(`${key.toUpperCase()}: ${errorContent}`);
					continue;
				}
				if (typeof errorContent === "object" && errorContent !== null) {
					for (const subKey in errorContent) {
						if (!Object.hasOwn(errorContent, subKey)) continue;
						const subContent = errorContent[subKey];
						if (Array.isArray(subContent)) {
							subContent.forEach((msg) => {
								errors.push(
									`${key.toUpperCase()} - ${subKey.toUpperCase()}: ${msg}`,
								);
							});
						} else if (typeof subContent === "string") {
							errors.push(
								`${key.toUpperCase()} - ${subKey.toUpperCase()}: ${subContent}`,
							);
						}
					}
				}
			}
		}

		errors.forEach((e, i) => {
			setTimeout(
				() => this.feedback.openSnackBar(e),
				i * DURATION_SNACK_BAR + 500,
			);
		});
	}

	private _isBadRequest(errorResponse: HttpErrorResponse) {
		return errorResponse.status >= 400 && errorResponse.status < 500;
	}

	private _isServerError(errorResponse: HttpErrorResponse) {
		return errorResponse.status >= 500 && errorResponse.status < 600;
	}

	private _isUnknownError(errorResponse: HttpErrorResponse) {
		return errorResponse.status === 0;
	}

	private _getErrorMessage(errorResponse: HttpErrorResponse) {
		if (
			typeof errorResponse.error?.detail === "string" &&
			errorResponse.error.detail !== ""
		)
			return errorResponse.error.detail;
		if (typeof errorResponse.error === "string" && errorResponse.error !== "")
			return errorResponse.error;

		return "Something went wrong!";
	}
}
