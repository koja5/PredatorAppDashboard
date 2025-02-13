import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-districts",
  templateUrl: "./all-districts.component.html",
  styleUrls: ["./all-districts.component.scss"],
})
export class AllDistrictsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-districts.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
