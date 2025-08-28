import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrComponent } from "app/components/dashboard/@core/common/toastr/toastr.component";
import {
  ActivityModel,
  DataPredatorsModel,
  FishDistrictModel,
  PredatorItemModel,
  WaterModel,
} from "app/components/dashboard/models/data-predators.model";
import { Location } from "@angular/common";
import { PredatorModel } from "app/components/dashboard/models/predator.model";
import { UserModel } from "app/components/models/user";
import { CallApiService } from "app/services/call-api.service";
import { StorageService } from "app/services/storage.service";

@Component({
  selector: "app-new-form-data-report",
  templateUrl: "./new-form-data-report.component.html",
  styleUrls: ["./new-form-data-report.component.scss"],
})
export class NewFormDataReportComponent {
  @Output() refreshGridEmit = new EventEmitter();
  public allItems = new DataPredatorsModel();
  public data = new PredatorModel();
  public uploaded: any = [];

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent,
    private _storageService: StorageService,
    private _translate: TranslateService,
    private _http: HttpClient,
    private _location: Location,
    private _activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMyUsers();
    this.getAllPredators();
    this.getAllTypeOfWaters();
    this.getAllFishDistricts();
    this.getAllActivities();
    console.log(this.data);
    this.data.longitude = new Float32Array([0]);
    this.data.latitude = new Float32Array([0]);
  }

  ngOnChanges() {}

  getMyUsers() {
    this._service
      .callGetMethod("/api/admin/getMyUsers")
      .subscribe((data: UserModel) => {
        this.allItems.users = data;
      });
  }

  getAllPredators() {
    this._service
      .callGetMethod("/api/superadmin/getAllPredators")
      .subscribe((data: PredatorItemModel) => {
        this.allItems.predators = data;
      });
  }

  getAllTypeOfWaters() {
    this._service
      .callGetMethod("/api/superadmin/getAllWaters")
      .subscribe((data: WaterModel) => {
        this.allItems.waters = data;
      });
  }

  getAllFishDistricts() {
    this._service
      .callGetMethod("/api/superadmin/getAllFishDistricts")
      .subscribe((data: FishDistrictModel) => {
        this.allItems.fishDistrict = data;
      });
  }

  getAllActivities() {
    this._service
      .callGetMethod("/api/superadmin/getAllActivities")
      .subscribe((data: ActivityModel) => {
        this.allItems.activities = data;
      });
  }

  packData(): FormData {
    let data = new FormData();

    for (let [key, value] of Object.entries(this.data)) {
      data.append(key, value);
    }

    data.set("id_edited", this._storageService.getDecodeToken().id);

    for (let i = 0; i < this.uploaded.length; i++) {
      data.append(
        "gallery[]",
        this.uploaded[i],
        this.uploaded[i].name ? this.uploaded[i].name : this.uploaded[i]
      );
    }

    return data;
  }

  save() {
    if (!this.checkRequiredValues()) {
      this._toastr.showErrorCustom(
        this._translate.instant("general.needToFillAllFields")
      );
      return;
    }

    const data = this.packData();

    this._http
      .post("https://praedatoren.app/api/upload/setPredatorFromAdmin", data)
      .subscribe((data) => {
        if (data) {
          this.refreshGridEmit.emit();
        }
      });
  }

  checkRequiredValues() {
    if (
      !this.data.creation_date ||
      !this.data.id_predator ||
      !this.data.total_number
    )
      return false;

    return true;
  }

  // events

  onChangeUser(event: any) {
    console.log(event);
    this.data.id_user = event.id;
  }

  onChangePredator(event: any) {
    this.data.id_predator = event.id;
  }

  onChangeWater(event: any) {
    this.data.id_water = event.id;
  }

  onChangeFishDistrict(event: any) {
    this.data.id_fish_district = event.id;
  }

  onChangeActivity(event: any) {
    this.data.id_activity = event.id;
  }

  changeGalleryImage(event: any) {
    this.data.gallery = event.gallery;
    this.uploaded = event.uploaded;
  }
}
