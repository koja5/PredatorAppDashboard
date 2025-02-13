import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { DynamicModule } from "../@core/dynamic-component/dynamic.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { CustomCommonModule } from "../@core/common/custom-common.module";
import { AllUsersComponent } from "./all-users/all-users.component";
import { AllPredatorsComponent } from "./all-predators/all-predators.component";
import { AllActivitiesComponent } from "./all-activities/all-activities.component";
import { AllWatersComponent } from "./all-waters/all-waters.component";
import { AllFishDistrictsComponent } from "./all-fish-districts/all-fish-districts.component";
import { AppConfigComponent } from "./app-config/app-config.component";
import { AllCountriesComponent } from "./all-countries/all-countries.component";
import { AllProvincesComponent } from "./all-provinces/all-provinces.component";
import { AllDistrictsComponent } from "./all-districts/all-districts.component";
import { AllCitiesComponent } from "./all-cities/all-cities.component";

const routes: Routes = [
  {
    path: "all-users",
    component: AllUsersComponent,
  },
  {
    path: "all-predators",
    component: AllPredatorsComponent,
  },
  {
    path: "all-activities",
    component: AllActivitiesComponent,
  },
  {
    path: "all-waters",
    component: AllWatersComponent,
  },
  {
    path: "all-fish-districts",
    component: AllFishDistrictsComponent,
  },
  {
    path: "app-config",
    component: AppConfigComponent,
  },
  {
    path: "all-countries",
    component: AllCountriesComponent,
  },
  {
    path: "all-provinces",
    component: AllProvincesComponent,
  },
  {
    path: "all-districts",
    component: AllDistrictsComponent,
  },
  {
    path: "all-cities",
    component: AllCitiesComponent,
  },
];

@NgModule({
  declarations: [
    AllUsersComponent,
    AllPredatorsComponent,
    AllActivitiesComponent,
    AllWatersComponent,
    AllFishDistrictsComponent,
    AppConfigComponent,
    AllCountriesComponent,
    AllProvincesComponent,
    AllDistrictsComponent,
    AllCitiesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgSelectModule,
    DynamicModule,
  ],

  bootstrap: [],
})
export class SuperadminModule {}
