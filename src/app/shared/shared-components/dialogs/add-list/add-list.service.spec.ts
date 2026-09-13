import { TestBed } from '@angular/core/testing';

import { firstValueFrom, of } from 'rxjs';
import { ScrumBoardsService } from '../../../../scrum-api/scrum-boards/scrum-boards.service';
import { ScrumListsService } from '../../../../scrum-api/scrum-lists/scrum-lists.service';
import { createBoardResponse, createListRequest, createListResponse } from '../../../../testing/fixtures';
import { AddListService } from './add-list.service';

describe('AddListService', () => {
  let service: AddListService;
  const getBoards$ = vi.fn();
  const addList$ = vi.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      { provide: ScrumBoardsService, useValue: { getBoards$ } },
      { provide: ScrumListsService, useValue: { addList$ } }
    ]});
    service = TestBed.inject(AddListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the value of getBoards$', async () => {
    const boards = [createBoardResponse()];
    getBoards$.mockReturnValue(of(boards));
    expect(await firstValueFrom(service.boards$)).toEqual(boards);
  });

  it('should call addList$ with the correct parameters', async () => {
    const listRequest = createListRequest();
    const listResponse = createListResponse();
    addList$.mockReturnValue(of(listResponse));
    const result = await firstValueFrom(service.addList$(listRequest));
    expect(addList$).toHaveBeenCalledWith(listRequest);
    expect(result).toEqual(listResponse);
  });

});
