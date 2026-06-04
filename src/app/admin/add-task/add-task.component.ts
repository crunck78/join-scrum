import {
	Component,
	EventEmitter,
	inject,
	Input,
	type OnChanges,
	OnInit,
	Output,
	type SimpleChanges,
} from "@angular/core";
import {
	FormControl,
	type FormControlStatus,
	FormGroup,
	Validators,
} from "@angular/forms";
import { CategoryResponse } from "../../shared/models/category.model";
import { ContactResponse } from "../../shared/models/contact.model";
import { SubtaskRequest } from "../../shared/models/subtask.model";
import {
	Task,
	TaskRequest,
	TaskResponse,
} from "../../shared/models/task.model";
import {
	AddTaskModule,
	PriorityType,
	type TaskFormGroup,
	TaskMode,
} from "./add-task.module";
import { AddTaskService } from "./add-task.service";

@Component({
	selector: "app-add-task",
	templateUrl: "./add-task.component.html",
	styleUrls: ["./add-task.component.scss"],
	imports: [AddTaskModule],
})
export class AddTaskComponent implements OnInit, OnChanges {
	private addTaskService = inject(AddTaskService);

	/**
	 * Empty Valid Form Group Initial Values
	 * Can be used for instance to clear the Form Group or validate Partials given Form Group Values
	 */
	readonly InitTask = {
		title: "",
		description: "",
		category: null,
		assignees: <number[]>[],
		dueDate: null,
		priority: null,
		subtasks: <SubtaskRequest[]>[],
	} as TaskFormGroup;

	addTaskForm = new FormGroup({
		title: new FormControl("", Validators.compose([Validators.required])),
		description: new FormControl(""),
		category: new FormControl<number | null>(
			null,
			Validators.compose([Validators.required]),
		),
		assignees: new FormControl(
			<number[]>[],
			Validators.compose([Validators.nullValidator]),
		),
		dueDate: new FormControl<Date | null>(
			null,
			Validators.compose([Validators.required, Validators.nullValidator]),
		),
		priority: new FormControl<PriorityType | null>(
			null,
			Validators.compose([Validators.required, Validators.nullValidator]),
		),
		subtasks: new FormControl(
			<SubtaskRequest[]>[],
			Validators.compose([Validators.nullValidator]),
		),
	});

	addSubtaskForm = new FormControl("");

	categories: CategoryResponse[] = [];
	contacts: ContactResponse[] = [];

	@Input() task!: TaskResponse;
	@Input() mode: TaskMode = "add";
	@Input() hideFooter = false;
	@Input() clearTaskForm$!: EventEmitter<void>;
	@Input() submitTaskForm$!: EventEmitter<void>;
	@Input() deleteTask$!: EventEmitter<void>;
	@Input() predefinedTaskRequest!: Partial<TaskRequest>;

	@Output() formStatus$ = new EventEmitter<FormControlStatus>();
	@Output() editedTask$ = new EventEmitter<TaskResponse | null>();
	@Output() addedTask$ = new EventEmitter<TaskResponse | null>();
	@Output() deletedTaskId$ = new EventEmitter<number | null>();

	ngOnInit() {
		this.loadCategories();
		this.loadContacts();
		this.addTaskForm.statusChanges.subscribe((status: FormControlStatus) =>
			this.formStatus$.emit(status),
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["task"] && !!this.task) {
			const taskRepresentation = Task.convertToRepresentation(this.task);
			this.addTaskForm.patchValue(taskRepresentation);
		}

		if (changes["clearTaskForm$"]) {
			this.clearTaskForm$.subscribe(() => this.resetAddTask());
		}

		if (changes["submitTaskForm$"]) {
			this.submitTaskForm$.subscribe(() => this.saveTask());
		}

		if (changes["deleteTask$"]) {
			this.deleteTask$.subscribe(() => this.deleteTask());
		}

		if (changes["predefinedTaskRequest"] && !!this.predefinedTaskRequest) {
			this.addTaskForm.reset(this.validatePredefinedTaskRequest());
		}
	}

	/**
	 *
	 * Allow to pass an Input Partial Predefined TaskRequest
	 * But Resetting Form Group to it may cause issues if not validated.
	 */
	private validatePredefinedTaskRequest() {
		const validTaskFormGroup = {} as TaskFormGroup;
		validTaskFormGroup.assignees =
			this.predefinedTaskRequest.assignees || this.InitTask.assignees;
		validTaskFormGroup.category =
			this.predefinedTaskRequest.category || this.InitTask.category;
		validTaskFormGroup.description =
			this.predefinedTaskRequest.description || this.InitTask.description;
		validTaskFormGroup.dueDate =
			this.predefinedTaskRequest.dueDate || this.InitTask.dueDate;
		validTaskFormGroup.priority =
			this.predefinedTaskRequest.priority || this.InitTask.priority;
		validTaskFormGroup.subtasks =
			this.predefinedTaskRequest.subtasks || this.InitTask.subtasks;
		validTaskFormGroup.title =
			this.predefinedTaskRequest.title || this.InitTask.title;
		return validTaskFormGroup;
	}

	addCategory() {
		this.addTaskService.openAddCategoryDialog$().subscribe((newCategory) => {
			if (newCategory) this.loadCategories();
		});
	}

	loadCategories() {
		this.addTaskService.categories$.subscribe(
			(values) => (this.categories = values),
		);
	}

	addContact() {
		this.addTaskService.openAddContactDialog$().subscribe((newContact) => {
			if (newContact) this.loadContacts();
		});
	}

	loadContacts() {
		this.addTaskService.contacts$.subscribe(
			(values) => (this.contacts = values),
		);
	}

	getCategoryOptionHTML = (option: CategoryResponse) => {
		return `
    <span class="category-option">
      <span  class="category-color" style="background-color: ${option["color"]}"></span>
      <span class="category-name">${option["name"]}</span>
    </span>`;
	};

	getPriorityOptionHTML = (option: { name: string }) => {
		return `
    <span class="priority-option">
      <span class="priority-option">${(option["name"] as string)?.toUpperCase()}</span>
      <img class="priority-icon" src="assets/${(option["name"] as string)?.toLowerCase()}.svg" alt="Priority Icon">
    </span>
    `;
	};

	addSubtask() {
		if (!this.addSubtaskForm.value) return;
		const newSubtask = {
			title: this.addSubtaskForm.value,
			done: false,
		} as SubtaskRequest;
		this.pushSubtask(newSubtask);
		this.addSubtaskForm.reset();
	}

	pushSubtask(subtask: SubtaskRequest) {
		const currentSubtasks =
			(this.addTaskForm.get("subtasks")?.value as SubtaskRequest[]) || [];
		currentSubtasks.push(subtask);
		this.addTaskForm.get("subtasks")?.patchValue(currentSubtasks);
	}

	removeSubtask(subtaskToRemove: SubtaskRequest) {
		const subtasks = this.addTaskForm.get("subtasks")?.value;
		const patchedSubtasks = subtasks?.filter(
			(st) => st !== subtaskToRemove,
		) as SubtaskRequest[];
		this.addTaskForm.get("subtasks")?.patchValue(patchedSubtasks);
	}

	saveTask() {
		if (this.mode === "add") this.addTask();
		if (this.mode === "edit") this.editTask();
	}

	addTask() {
		if (!this.addTaskForm.valid) return;
		this.addTaskService
			.addTask$(this.addTaskForm.value as Partial<TaskRequest>)
			.subscribe((newTask) => {
				if (!newTask) return;
				this.addedTask$.emit(newTask);
			});
	}

	editTask() {
		if (!this.addTaskForm.valid) return;
		const toEditTask = this.addTaskForm.value as Partial<TaskRequest>;
		this.addTaskService.editTask$(this.task.id, toEditTask).subscribe({
			next: (res) => this.editedTask$.emit(res),
		});
	}

	deleteTask() {
		if (this.mode !== "edit") return;
		this.addTaskService.deleteTask$(this.task.id).subscribe({
			next: () => this.deletedTaskId$.emit(this.task.id),
		});
	}

	resetAddTask() {
		this.addTaskForm.reset(this.InitTask);
		this.addSubtaskForm.reset();
	}
}
