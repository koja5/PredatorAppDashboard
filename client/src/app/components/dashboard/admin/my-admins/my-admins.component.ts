import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-my-admins",
  templateUrl: "./my-admins.component.html",
  styleUrls: ["./my-admins.component.scss"],
})
export class MyAdminsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "my-admins.json";
}
