import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardComponent } from "src/app/shared/shared-components/card/card.component";
import { CategoryCardComponent } from "src/app/shared/shared-components/category-card/category-card.component";
import { PageTitleComponent } from "src/app/shared/shared-components/page-title/page-title.component";
import { RouterLinkComponent } from "src/app/shared/shared-components/router-link/router-link.component";

const imports = [
    CommonModule,
    CardComponent,
    PageTitleComponent,
    CategoryCardComponent,
    RouterLinkComponent
];

@NgModule({
    declarations: [],
    imports: [...imports],
    exports: [...imports]
})
export class SummaryModule { }