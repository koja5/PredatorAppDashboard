import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { DynamicModule } from "../@core/dynamic-component/dynamic.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { CustomCommonModule } from "../@core/common/custom-common.module";
import { MyUsersComponent } from "./my-users/my-users.component";
import { PredatorsComponent } from "./predators/predators.component";
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

const routes: Routes = [
  {
    path: "my-users",
    component: MyUsersComponent,
  },
  {
    path: "predators",
    component: PredatorsComponent,
  },
];

@NgModule({
  declarations: [MyUsersComponent, PredatorsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DynamicModule,
    CustomCommonModule,
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [],
})
export class AdminModule {}
