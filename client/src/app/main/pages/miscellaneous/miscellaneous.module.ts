import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CoreCommonModule } from "@core/common.module";

import { ErrorComponent } from "app/main/pages/miscellaneous/error/error.component";
import { SuccessComponent } from "./success/success.component";
import { TranslateModule } from "@ngx-translate/core";

// routing
const routes: Routes = [
  {
    path: "miscellaneous/error",
    component: ErrorComponent,
    data: { animation: "misc" },
  },
  {
    path: "miscellaneous/success",
    component: SuccessComponent,
    data: { animation: "misc" },
  },
];

@NgModule({
  declarations: [ErrorComponent, SuccessComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    TranslateModule,
  ],
})
export class MiscellaneousModule {}
