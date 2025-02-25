import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-admins",
  templateUrl: "./all-admins.component.html",
  styleUrls: ["./all-admins.component.scss"],
})
export class AllAdminsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/superadmin";
  public file = "all-admins.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
