import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-areas",
  templateUrl: "./all-areas.component.html",
  styleUrls: ["./all-areas.component.scss"],
})
export class AllAreasComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-areas.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
