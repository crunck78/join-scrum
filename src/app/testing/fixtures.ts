import { HarnessLoader } from "@angular/cdk/testing";
import { Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { MatMenuHarness } from "@angular/material/menu/testing";
import { By } from "@angular/platform-browser";
import { of, tap } from "rxjs";
import { BoardResponse, BoardResponseAPI } from "../shared/models/board.model";
import {
	CategoryRequestAPI,
	CategoryResponse,
	CategoryResponseAPI,
} from "../shared/models/category.model";
import {
	ContactRequestAPI,
	ContactResponse,
	ContactResponseAPI,
} from "../shared/models/contact.model";
import { ListResponse, ListResponseAPI } from "../shared/models/list.model";
import {
	SubtaskRequest,
	SubtaskResponseAPI,
} from "../shared/models/subtask.model";
import {
	SummaryResponse,
	SummaryResponseAPI,
} from "../shared/models/summary.model";
import {
	TaskRequest,
	TaskResponse,
	TaskResponseAPI,
} from "../shared/models/task.model";
import {
	UserRequest,
	UserResponse,
	UserResponseAPI,
} from "../shared/models/user.model";

export function createUserResponse(
	overrides?: Partial<UserResponse>,
): UserResponse {
	return {
		id: 1,
		name: "Test User",
		email: "test@test.local",
		image: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		isGuest: false,
		...overrides,
	};
}

export function createUserResponseAPI(
	overrides?: Partial<UserResponseAPI>,
): UserResponseAPI {
	return {
		id: 1,
		email: "test@example.com",
		name: "Test User",
		image: "test-image.jpg",
		created_at: "2024-01-01T00:00:00Z",
		updated_at: "2024-01-01T00:00:00Z",
		is_guest: false,
		...overrides,
	};
}

export function createUserRequest(
	overrides?: Partial<UserRequest>,
): UserRequest {
	return {
		email: "test@example.com",
		name: "Test User",
		image: "test-image.jpg",
		...overrides,
	};
}

export function createSummaryResponse(
	overrides?: Partial<SummaryResponse>,
): SummaryResponse {
	return {
		tasksByCategory: [],
		tasksByPriority: [],
		tasksInLists: [],
		...overrides,
	};
}

export function createContactResponse(
	overrides?: Partial<ContactResponse>,
): ContactResponse {
	return {
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
		phoneNumber: "123-456-7890",
		createdAt: new Date(),
		updatedAt: new Date(),
		...overrides,
	};
}

export function createContactResponseAPI(
	overrides?: Partial<ContactResponseAPI>,
): ContactResponseAPI {
	return {
		created_at: "",
		email: "test.user@example.local",
		id: 1,
		name: "John Doe",
		phone_number: "01555555555",
		updated_at: "",
		...overrides,
	};
}

export function createContactRequestAPI(
	overrides?: Partial<ContactRequestAPI>,
): ContactRequestAPI {
	return {
		email: "test.user@example.local",
		name: "John Doe",
		phone_number: "01555555555",
		...overrides,
	};
}

export function createCategoryResponse(
	overrides?: Partial<CategoryResponse>,
): CategoryResponse {
	return {
		id: 1,
		name: "IT",
		color: "#ff0000",
		createdAt: new Date(),
		updatedAt: new Date(),
		...overrides,
	};
}

export function createCategoryResponseAPI(
	overrides?: Partial<CategoryResponseAPI>,
): CategoryResponseAPI {
	return {
		color: "#ffffff",
		created_at: "",
		id: 1,
		name: "IT",
		update_at: "",
		...overrides,
	};
}

export function createCategoryRequestAPI(
	overrides?: Partial<CategoryRequestAPI>,
): CategoryRequestAPI {
	return {
		name: "IT",
		color: "#ffffff",
		...overrides,
	};
}

export function createTaskResponse(
	overrides?: Partial<TaskResponse>,
): TaskResponse {
	return {
		id: 1,
		title: "Test Task",
		description: "",
		category: null,
		assignees: [],
		dueDate: new Date(),
		priority: "Low",
		subtasks: [],
		createdAt: new Date(),
		updatedAt: new Date(),
		position: 0,
		...overrides,
	};
}

export function createTaskRequest(
	overrides?: Partial<TaskRequest>,
): TaskRequest {
	return {
		title: "Test Subtask",
		description: "",
		category: 1,
		assignees: [1],
		dueDate: new Date(),
		priority: "Low",
		subtasks: [],
		list: 1,
		position: 0,
		...overrides,
	};
}

export function createTaskResponseAPI(
	overrides?: Partial<TaskResponseAPI>,
): TaskResponseAPI {
	return {
		assignees: [],
		category: null,
		created_at: "",
		description: "Some Bug to fix",
		due_date: "",
		id: 1,
		position: 1,
		priority: "Low",
		subtasks: [],
		title: "Fix the bug",
		updated_at: "",
		...overrides,
	};
}

export function createListResponse(
	overrides?: Partial<ListResponse>,
): ListResponse {
	return {
		id: 1,
		name: "TODO",
		createdAt: new Date(),
		updatedAt: new Date(),
		position: 0,
		tasks: [],
		...overrides,
	};
}

export function createListResponseAPI(
	overrides?: Partial<ListResponseAPI>,
): ListResponseAPI {
	return {
		created_at: "",
		updated_at: "",
		id: 1,
		tasks: [],
		name: "Todo",
		position: 1,
		...overrides,
	};
}

export function createBoardResponse(
	overrides?: Partial<BoardResponse>,
): BoardResponse {
	return {
		title: "Test Board",
		id: "1",
		lists: [],
		createdAt: new Date(),
		updatedAt: new Date(),
		...overrides,
	};
}

export function createBoardResponseAPI(
	overrides?: Partial<BoardResponseAPI>,
): BoardResponseAPI {
	return {
		title: "Board Title",
		id: "1",
		created_at: "",
		updated_at: "",
		lists: [],
		...overrides,
	};
}

export function createSubtaskRequest(
	overrides?: Partial<SubtaskRequest>,
): SubtaskRequest {
	return {
		title: "Test Subtask",
		done: false,
		...overrides,
	};
}

export function createSubtaskResponseAPI(
	overrides?: Partial<SubtaskResponseAPI>,
): SubtaskResponseAPI {
	return {
		created_at: "",
		done: false,
		id: 1,
		title: "Unit tests",
		updated_at: "",
		...overrides,
	};
}

export function createSummaryResponseAPI(
	overrides?: Partial<SummaryResponseAPI>,
): SummaryResponseAPI {
	return {
		tasks_by_category: [],
		tasks_by_priority: [],
		tasks_in_lists: [],
		...overrides,
	};
}

export async function clickMenuItem(loader: HarnessLoader, label: string) {
	const matMenus = await loader.getAllHarnesses(MatMenuHarness);
	for (const menu of matMenus) {
		if (await menu.isOpen()) {
			const items = await menu.getItems();
			for (const item of items) {
				if ((await item.getText()).includes(label)) {
					await item.click();
				}
			}
		}
	}
}

export function clickElement(
	fixture: ComponentFixture<unknown>,
	querySelector: string,
) {
	getElement(fixture, querySelector).click();
}

export function getElement(
	fixture: ComponentFixture<unknown>,
	querySelector: string,
) {
	return fixture.nativeElement.querySelector(querySelector);
}

export function getComponentInstance<T>(
	fixture: ComponentFixture<unknown>,
	component: Type<T>,
): T {
	return fixture.debugElement.query(By.directive(component))
		.componentInstance as T;
}

export function mockWithSideEffect<T>(value: T, fn: () => void) {
	return of(value).pipe(tap({ next: fn }));
}
