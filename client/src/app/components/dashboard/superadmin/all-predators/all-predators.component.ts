import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-predators",
  templateUrl: "./all-predators.component.html",
  styleUrls: ["./all-predators.component.scss"],
})
export class AllPredatorsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-predators.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
