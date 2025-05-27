import { Component } from "@angular/core";
import { CallApiService } from "app/services/call-api.service";
import { ToastrComponent } from "../../@core/common/toastr/toastr.component";

@Component({
  selector: "app-area-settings",
  templateUrl: "./area-settings.component.html",
  styleUrls: ["./area-settings.component.scss"],
})
export class AreaSettingsComponent {
  public path = "forms/admin";
  public file = "area-settings.json";

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent
  ) {}

  submit(event: any) {
    this._service
      .callPostMethod("api/admin/setAreaSettings", event)
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
        }
      });
  }
}
