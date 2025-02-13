import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-cities",
  templateUrl: "./all-cities.component.html",
  styleUrls: ["./all-cities.component.scss"],
})
export class AllCitiesComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-cities.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
