import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-provinces",
  templateUrl: "./all-provinces.component.html",
  styleUrls: ["./all-provinces.component.scss"],
})
export class AllProvincesComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-provinces.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
