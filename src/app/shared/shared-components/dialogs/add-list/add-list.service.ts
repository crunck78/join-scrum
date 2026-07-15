import { Injectable, inject } from "@angular/core";
import { take } from "rxjs";
import { ScrumBoardsService } from "../../../../scrum-api/scrum-boards/scrum-boards.service";
import { ScrumListsService } from "../../../../scrum-api/scrum-lists/scrum-lists.service";
import { ListRequest } from "../../../models/list.model";

@Injectable({
	providedIn: "root",
})
export class AddListService {
	private scrumList = inject(ScrumListsService);
	private scrumBoard = inject(ScrumBoardsService);

	get boards$() {
		return this.scrumBoard.getBoards$().pipe(take(1));
	}

	addList$(value: Partial<ListRequest>) {
		return this.scrumList.addList$(value).pipe(take(1));
	}
}
