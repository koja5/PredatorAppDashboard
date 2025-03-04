import { Component } from "@angular/core";
import { CallApiService } from "app/services/call-api.service";
import { PredatorModel } from "../../models/predator.model";

@Component({
  selector: "app-predators",
  templateUrl: "./predators.component.html",
  styleUrls: ["./predators.component.scss"],
})
export class PredatorsComponent {
  public predators: any;
  public data: PredatorModel;
  public loader = false;

  constructor(private _service: CallApiService) {}

  ngOnInit() {
    this._service.callGetMethod("/api/admin/getPredators").subscribe((data) => {
      this.predators = data;
    });
  }

  submit(event: any) {
    this.loader = true;
    this._service
      .callGetMethod("/api/admin/getPredatorById", event)
      .subscribe((data: any) => {
        this.data = data;
        this.loader = false;
      });
  }
}
