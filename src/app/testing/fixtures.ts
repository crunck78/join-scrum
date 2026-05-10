import { BoardResponse } from "../shared/models/board.model";
import { CategoryResponse } from "../shared/models/category.model";
import { ContactResponse } from "../shared/models/contact.model";
import { ListResponse } from "../shared/models/list.model";
import { SummaryResponse } from "../shared/models/summary.model";
import { TaskResponse } from "../shared/models/task.model";
import { UserResponse } from "../shared/models/user.model";

export function createUserResponse(overrides?: Partial<UserResponse>): UserResponse {
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

export function createSummaryResponse(overrides?: Partial<SummaryResponse>): SummaryResponse {
	return {
		tasksByCategory: [],
		tasksByPriority: [],
		tasksInLists: [],
		tasksInBacklog: { count: 0, latestDueDate: new Date() },
		...overrides,
	};
}

export function createContactResponse(overrides?: Partial<ContactResponse>): ContactResponse {
	return {
		id: 1,
		email: "contact@test.local",
		name: "Test Contact",
		phoneNumber: "01222222222",
		createdAt: new Date(),
		updatedAt: new Date(),
		...overrides,
	};
}

export function createCategoryResponse(overrides?: Partial<CategoryResponse>): CategoryResponse {
	return {
		id: 1,
		name: "IT",
		color: "#ff8899",
		createdAt: new Date(),
		updatedAt: new Date(),
		...overrides,
	};
}

export function createTaskResponse(overrides?: Partial<TaskResponse>): TaskResponse {
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

export function createListResponse(overrides?: Partial<ListResponse>): ListResponse {
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

export function createBoardResponse(overrides?: Partial<BoardResponse>): BoardResponse {
	return {
		title: "Test Board",
		id: "1",
		lists: [],
		createdAt: new Date(),
		updatedAt: new Date(),
		...overrides,
	};
}
