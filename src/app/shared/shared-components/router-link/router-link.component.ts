import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router, RouterLinkActive, RouterModule } from '@angular/router';

export declare type LinkType = 'mat-raised-button' | 'mat-fab' | 'mat-flat-button' | 'mat-icon-button' | 'mat-mini-fab' | 'mat-button' | 'mat-stroked-button';

@Component({
  selector: 'app-router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    RouterLinkActive
  ]
})
export class RouterLinkComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['routeByPath']){
      this.route = this.router.config.find(r => r.path === this.routeByPath);
    }
  }

  @Input() route!: Route | undefined;
  @Input() basePath?: string = ''; // New Input for base path
  @Input() linkType: LinkType = 'mat-raised-button';
  @Input() hidden = false;
  @Input() routeByPath!: string;

  constructor(private router: Router){}
}
