import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { MaterialModule } from "./shared/modules/material/material.module";
import { SideComponent } from "./side/side.component";

const imports = [
	CommonModule,
	MaterialModule,
	SideComponent,
	HeaderComponent,
	MainComponent,
];

@NgModule({
	imports: [...imports],
	exports: [...imports],
})
export class AppModule {}
