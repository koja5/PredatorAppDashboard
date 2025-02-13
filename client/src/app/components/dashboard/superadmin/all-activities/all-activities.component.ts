import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-activities",
  templateUrl: "./all-activities.component.html",
  styleUrls: ["./all-activities.component.scss"],
})
export class AllActivitiesComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-activities.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
