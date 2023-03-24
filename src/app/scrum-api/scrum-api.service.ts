import { Injectable } from '@angular/core';

export interface ApiToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumApiService {

  token!: string;

  constructor() { }
}
