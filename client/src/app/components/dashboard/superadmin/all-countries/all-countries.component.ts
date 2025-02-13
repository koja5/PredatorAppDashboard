import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-countries",
  templateUrl: "./all-countries.component.html",
  styleUrls: ["./all-countries.component.scss"],
})
export class AllCountriesComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-countries.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
