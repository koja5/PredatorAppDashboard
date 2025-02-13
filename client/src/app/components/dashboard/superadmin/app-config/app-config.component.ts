import { Component } from "@angular/core";
import { CallApiService } from "app/services/call-api.service";
import { AppConfigModel } from "../../models/app-config.model";
import { ToastrComponent } from "../../@core/common/toastr/toastr.component";

@Component({
  selector: "app-app-config",
  templateUrl: "./app-config.component.html",
  styleUrls: ["./app-config.component.scss"],
})
export class AppConfigComponent {
  public path = "forms/superadmin";
  public file = "app-config.json";
  public data: AppConfigModel;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this._service
      .callGetMethod("/api/superadmin/getAppConfig")
      .subscribe((data: AppConfigModel) => {
        this.data = data;
      });
  }

  saveChanges(event: any) {
    this._service
      .callPostMethod("api/superadmin/setAppConfig")
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
        }
      });
  }
}
