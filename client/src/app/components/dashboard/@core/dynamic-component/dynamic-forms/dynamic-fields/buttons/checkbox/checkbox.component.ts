import { Component } from "@angular/core";
import { FieldConfig } from "../../../models/field-config";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent {
  public config: FieldConfig;
  public group: FormGroup;

  constructor() {
    this.config = new FieldConfig();
    this.group = new FormGroup({});
  }
}
