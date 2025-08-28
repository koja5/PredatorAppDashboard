import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "@kolkov/ngx-gallery";
import { ToastrComponent } from "../../@core/common/toastr/toastr.component";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { CallApiService } from "app/services/call-api.service";
import {
  ActivityModel,
  DataPredatorsModel,
  FishDistrictModel,
  PredatorItemModel,
  UserModel,
  WaterModel,
} from "../../models/data-predators.model";
import { StorageService } from "app/services/storage.service";

@Component({
  selector: "app-form-data-report",
  templateUrl: "./form-data-report.component.html",
  styleUrls: ["./form-data-report.component.scss"],
})
export class FormDataReportComponent {
  @Input() data: any;
  @Input() showMap: boolean = true;
  @Output() showQuestionModalEmit = new EventEmitter<null>();
  @Output() approveObservationEmit = new EventEmitter<any>();
  @Output() refreshGridEmit = new EventEmitter<any>();
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[] = [];
  public mapData: any;
  public uploaded: any = [];
  public allItems = new DataPredatorsModel();
  public isEditMode = false;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent,
    private _translate: TranslateService,
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  ngOnInit() {
    this.data.creation_date = new Date(this.data.creation_date);
    this.initializeGalleryOptions();
    this.getMyUsers();
    this.getAllPredators();
    this.getAllTypeOfWaters();
    this.getAllFishDistricts();
    this.getAllActivities();
  }

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
      .callGetMethod("/api/admin/getAllFishDistricts")
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

  ngOnChanges() {
    this.packImage();
    this.packMap();
  }

  initializeGalleryOptions() {
    this.galleryOptions = [
      {
        width: "100%",
        height: "300px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      {
        breakpoint: 400,
        preview: false,
      },
    ];
  }

  packImage() {
    this.galleryImages = [];
    if (this.data.gallery) {
      const images = this.data.gallery.split(";");
      for (let i = 0; i < images.length; i++) {
        const image =
          "https://praedatoren.app/assets/file-storage/" + images[i];
        this.galleryImages.push({
          small: image,
          medium: image,
          big: image,
        });
      }
    }
  }

  packMap() {
    this.mapData = null;
    setTimeout(() => {
      this.mapData = this.data;
    }, 10);
  }

  changeGalleryImage(event: any) {
    this.data.gallery = event.gallery;
    this.uploaded = event.uploaded;
  }

  showQuestionModel() {
    this.showQuestionModalEmit.emit();
  }

  approveObservation() {
    this.approveObservationEmit.emit(this.data);
  }

  packData(): FormData {
    let data = new FormData();

    for (let [key, value] of Object.entries(this.data)) {
      data.append(key, value as string);
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

  checkRequiredValues() {
    if (!this.data.creation_date || !this.data.id_predator || !this.data.total_number) return false;

    return true;
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
          this._toastr.showSuccess();
          this.refreshGridEmit.emit();
        }
      });
  }
}
