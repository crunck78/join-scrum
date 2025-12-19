import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import { BoardResponse } from "../../shared/models/board.model";
import { ListResponse } from "../../shared/models/list.model";
import { TaskResponse } from "../../shared/models/task.model";
import { BoardComponent } from "./board.component";
import { BoardService } from "./board.service";

describe("BoardComponent", () => {
	let component: BoardComponent;
	let fixture: ComponentFixture<BoardComponent>;
	let boardService: BoardService;
	let getBoardServiceSpy: Mock<() => Observable<BoardResponse | null>>;
	let addBoardServiceSpy: Mock<() => Observable<BoardResponse | null>>;
	let addListServiceSpy: Mock<() => Observable<ListResponse | undefined>>;

	let loader: HarnessLoader;
	let rootLoader: HarnessLoader;

	const board: BoardResponse = {
		title: "First Board",
		id: "1",
		lists: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const backlog: TaskResponse[] = [
		{
			id: 1,
			title: "Todo",
			description: "",
			category: {
				id: 1,
				name: "IT",
				color: "#ff8899",
				createdAt: new Date(),
				updateAt: new Date(),
			},
			assignees: [],
			dueDate: new Date(),
			priority: "Low",
			subtasks: [],
			createdAt: new Date(),
			updatedAt: new Date(),
			position: 0,
		},
	];

	const list: ListResponse = {
		id: 1,
		name: "TODO",
		createdAt: new Date(),
		updatedAt: new Date(),
		position: 0,
		tasks: [],
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [BoardComponent],
			providers: [BoardService],
		});
		boardService = TestBed.inject(BoardService);
		getBoardServiceSpy = vi.spyOn(boardService, "board$", "get");
		addBoardServiceSpy = vi.spyOn(boardService, "addBoard$");
		addListServiceSpy = vi.spyOn(boardService, "addList$");
		fixture = TestBed.createComponent(BoardComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);
		rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
		fixture.autoDetectChanges();
		component = fixture.componentInstance;
	});

	it("should create with Add Board button", async () => {
		getBoardServiceSpy.mockReturnValue(of(null));
		addBoardServiceSpy.mockReturnValue(of(board));
		addListServiceSpy.mockReturnValue(of(list));
		const button: HTMLElement = fixture.nativeElement.querySelector(
			'button[aria-label="Add Board"]',
		);
		expect(component).toBeDefined();
		expect(getBoardServiceSpy).toBeCalledTimes(1);
		expect(button).toBeTruthy();

		const addBoardSpy = vi.spyOn(component, "addBoard");
		button.click();

		await fixture.whenStable();

		expect(addBoardSpy).toBeCalledTimes(1);
		expect(addBoardServiceSpy).toBeCalledTimes(1);

		expect(component.board).toEqual(board);

		const buttonAfterClick = fixture.nativeElement.querySelector(
			'button[aria-label="Add Board"]',
		);
		expect(buttonAfterClick).toBeFalsy();

		const buttonAddList = fixture.nativeElement.querySelector(
			'button[aria-label="Add List"]',
		);
		expect(buttonAddList).toBeTruthy();

		const addListSpy = vi.spyOn(component, "addList");
		const refreshBoardSpy = vi.spyOn(component, "refreshBoard");
		buttonAddList.click();

		await fixture.whenStable();
		expect(addListSpy).toBeCalledTimes(1);
		expect(addListServiceSpy).toBeCalledTimes(1);
		expect(refreshBoardSpy).toBeCalledTimes(1);
	});
});
