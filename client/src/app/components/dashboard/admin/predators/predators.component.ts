import { Component } from "@angular/core";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-predators",
  templateUrl: "./predators.component.html",
  styleUrls: ["./predators.component.scss"],
})
export class PredatorsComponent {
  public predators: any;

  constructor(private _service: CallApiService) {}

  ngOnInit() {
    this._service.callGetMethod("/api/admin/getPredators").subscribe((data) => {
      this.predators = data;
    });
  }
}
