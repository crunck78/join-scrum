import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
  standalone: true,
})
export class PageTitleComponent {
  constructor(private router: Router, private titleService: Title){

  }

  get title(){
    return this.titleService.getTitle();
  }
}
