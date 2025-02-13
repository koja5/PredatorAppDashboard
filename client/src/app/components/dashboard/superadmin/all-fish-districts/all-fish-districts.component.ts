import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-fish-districts",
  templateUrl: "./all-fish-districts.component.html",
  styleUrls: ["./all-fish-districts.component.scss"],
})
export class AllFishDistrictsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-fish-districts.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
