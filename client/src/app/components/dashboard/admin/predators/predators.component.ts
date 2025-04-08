import { Component, ViewChild } from "@angular/core";
import { CallApiService } from "app/services/call-api.service";
import { PredatorModel } from "../../models/predator.model";

import { DialogConfirmComponent } from "../../@core/common/dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "../../@core/common/toastr/toastr.component";
import { NgxGalleryImage } from "@kolkov/ngx-gallery";
// import { ImageItem } from "ng-gallery";

@Component({
  selector: "app-predators",
  templateUrl: "./predators.component.html",
  styleUrls: ["./predators.component.scss"],
})
export class PredatorsComponent {
  @ViewChild(DialogConfirmComponent) dialogConfirm;
  public predators: any;
  public data: PredatorModel;
  public noDataFound = false;
  public loader = false;
  public loaderData = false;
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.getPredators();
  }

  getPredators() {
    this.loaderData = true;
    this._service.callGetMethod("/api/admin/getPredators").subscribe((data) => {
      this.predators = data;
      this.loaderData = false;
    });
  }

  submit(event: any) {
    if (event) {
      this.loader = true;
      this.noDataFound = false;
      this._service
        .callGetMethod("/api/admin/getPredatorById", event)
        .subscribe((data: any) => {
          this.data = data;
          this.loader = false;
        });
    } else {
      this.loader = false;
      this.data = null;
      this.noDataFound = true;
    }
  }

  deletePredator() {
    this.loaderData = true;
    this._service
      .callPostMethod("/api/admin/deletePredator", this.data)
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
          this.removePredatorFromList(this.data.id);
          this.data = null;
          this.loaderData = false;
        }
      });
  }

  removePredatorFromList(id: number) {
    for (let i = 0; i < this.predators.length; i++) {
      if (this.predators[i].id === id) {
        this.predators.splice(i, 1);
        break;
      }
    }
  }

  showQuestionModalEmit() {
    this.dialogConfirm.showQuestionModal();
  }
}
