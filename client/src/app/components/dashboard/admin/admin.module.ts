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
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { AllObservationReportsComponent } from "./all-observation-reports/all-observation-reports.component";
import { CoreSidebarModule } from "@core/components";
import { CoreDirectivesModule } from "@core/directives/directives";
import { CorePipesModule } from "@core/pipes/pipes.module";
import { FormDataReportComponent } from './form-data-report/form-data-report.component';

const routes: Routes = [
  {
    path: "my-users",
    component: MyUsersComponent,
  },
  {
    path: "predators",
    component: PredatorsComponent,
  },
  {
    path: "all-observation-reports",
    component: AllObservationReportsComponent,
  },
];

@NgModule({
  declarations: [
    MyUsersComponent,
    PredatorsComponent,
    AllObservationReportsComponent,
    FormDataReportComponent,
  ],
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
    NgxGalleryModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AdminModule {}
