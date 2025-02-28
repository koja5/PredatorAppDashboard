import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-my-users",
  templateUrl: "./my-users.component.html",
  styleUrls: ["./my-users.component.scss"],
})
export class MyUsersComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "my-users.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
