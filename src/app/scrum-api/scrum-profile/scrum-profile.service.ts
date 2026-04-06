import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, type Observable } from "rxjs";
import {
	User,
	UserRequest,
	UserResponse,
	UserResponseAPI,
} from "../../shared/models/user.model";
export const PROFILE_ENDPOINT = "/api/user/me/";
export const PROFILE_IMAGE_ENDPOINT = "/api/user/user-upload-image/";

export interface Profile {
	id?: number;
	email: string;
	name: string;
	image: string;
	createdAt?: Date;
	updatedAt?: Date;
}

@Injectable({
	providedIn: "root",
})
export class ScrumProfileService {
	private http = inject(HttpClient);

	profileEndpoint = PROFILE_ENDPOINT;
	profile!: Profile;

	getProfile$(): Observable<UserResponse | null> {
		return this.http.get<UserResponseAPI>(this.profileEndpoint).pipe(
			map((profile) => (profile ? User.createInternalValue(profile) : null)),
			catchError(() => of(null)),
		);
	}

	editProfile$(
		profile: Partial<UserRequest>,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_profileId: number,
	): Observable<UserResponse | null> {
		const editProfile = User.createRepresentation(profile);
		return this.http
			.patch<UserResponseAPI>(this.profileEndpoint, editProfile)
			.pipe(
				map((profile: UserResponseAPI | null) =>
					profile ? User.createInternalValue(profile) : null,
				),
				catchError(() => of(null)),
			);
	}

	deleteProfile$(): Observable<boolean> {
		return this.http.delete<number | null>(this.profileEndpoint).pipe(
			map(() => true),
			catchError(() => of(false)),
		);
	}
}
