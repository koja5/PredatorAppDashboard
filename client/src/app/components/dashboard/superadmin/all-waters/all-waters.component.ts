import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-waters",
  templateUrl: "./all-waters.component.html",
  styleUrls: ["./all-waters.component.scss"],
})
export class AllWatersComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-waters.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
