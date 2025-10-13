import { Component, TemplateRef, ViewChild } from "@angular/core";
import { CallApiService } from "app/services/call-api.service";
import { PredatorModel } from "../../models/predator.model";

import { DialogConfirmComponent } from "../../@core/common/dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "../../@core/common/toastr/toastr.component";
import { NgxGalleryImage } from "@kolkov/ngx-gallery";
import { HelpService } from "app/services/help.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import { ImageItem } from "ng-gallery";

@Component({
  selector: "app-predators",
  templateUrl: "./predators.component.html",
  styleUrls: ["./predators.component.scss"],
})
export class PredatorsComponent {
  @ViewChild(DialogConfirmComponent) dialogConfirm;
  @ViewChild("approveObservationQuestion")
  approveObservationQuestion: DialogConfirmComponent;
  @ViewChild("modal") modal: TemplateRef<any>;
  @ViewChild("modalPreviewDataForMobile")
  modalPreviewDataForMobile: TemplateRef<any>;
  public predators: any;
  public allPredators: any;
  public data: PredatorModel;
  public noDataFound = false;
  public loader = false;
  public loaderData = false;
  galleryImages: NgxGalleryImage[] = [];
  public modalDialog: any;
  public modalDialogPreviewData: any;
  public filter: any;
  public filterFlag = 0;
  public mobileDevice = false;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent,
    private _helpService: HelpService,
    private _modalService: NgbModal
  ) {}

  ngOnInit() {
    if (window.innerWidth < 1200) {
      this.mobileDevice = true;
    }
    this.getPredators();
  }

  getPredators() {
    this.loaderData = true;
    this._service.callGetMethod("/api/admin/getPredators").subscribe((data) => {
      this.predators = data;
      this.allPredators = this._helpService.copyObject(data);
      this.loaderData = false;
    });
  }

  submit(event: any) {
    this.data = null;
    if (event) {
      this.loader = true;
      this.noDataFound = false;
      this._service
        .callGetMethod("/api/admin/getPredatorById", event)
        .subscribe((data: any) => {
          if (this.mobileDevice) {
            this.showModalPreviewDataForMobile();
          }
          this.data = data;
          this.loader = false;
        });
    } else {
      this.loader = false;
      this.data = null;
      this.noDataFound = true;
    }
  }

  closeForm() {
    this.data = null;
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

  showFilterModel() {
    setTimeout(() => {
      this.modalDialog = this._modalService.open(this.modal, {
        centered: true,
        size: "lg",
        windowClass: "modal modal-danger",
      });
    }, 20);
  }

  showModalPreviewDataForMobile() {
    setTimeout(() => {
      this.modalDialogPreviewData = this._modalService.open(
        this.modalPreviewDataForMobile,
        {
          centered: true,
          size: "lg",
          windowClass: "modal modal-danger",
        }
      );
    }, 20);
  }

  clearFilter() {
    this.filter = null;
    this.loaderData = true;
    setTimeout(() => {
      this.filterFlag = 0;
      this.predators = this.allPredators;
      this.modalDialog.close();
      this.loaderData = false;
    }, 20);
  }

  submitFilter(event: any) {
    this.filter = event;
    this.loaderData = true;
    this.filterFlag = 0;
    setTimeout(() => {
      this.predators = this.allPredators;
      if (event.creation_date_from) {
        this.predators = this.predators.filter(
          (s) => new Date(s.creation_date) > event.creation_date_from
        );
        this.filterFlag++;
      }
      if (event.creation_date_to) {
        this.predators = this.predators.filter(
          (s) => new Date(s.creation_date) < event.creation_date_to
        );
        this.filterFlag++;
      }

      if (event.gps != undefined) {
        if (!event.gps) {
          this.predators = this.predators.filter(
            (s) => s.longitude === null && s.latitude === null
          );
        } else {
          this.predators = this.predators.filter(
            (s) => s.longitude !== null && s.latitude !== null
          );
        }
        this.filterFlag++;
      }
      if (event.total_number_from) {
        this.predators = this.predators.filter(
          (s) => s.total_number > event.total_number_from
        );
        this.filterFlag++;
      }
      if (event.total_number_to) {
        this.predators = this.predators.filter(
          (s) => s.total_number < event.total_number_from
        );
        this.filterFlag++;
      }

      if (event.gallery != undefined) {
        if (!event.gallery) {
          this.predators = this.predators.filter((s) => s.gallery === null);
        } else {
          this.predators = this.predators.filter((s) => s.gallery !== null);
        }
        this.filterFlag++;
      }
      if (event.including_young_animals) {
        this.predators = this.predators.filter(
          (s) => s.including_young_animals === event.including_young_animals
        );
        this.filterFlag++;
      }
      if (event.including_female_animals) {
        this.predators = this.predators.filter(
          (s) => s.including_female_animals === event.including_female_animals
        );
        this.filterFlag++;
      }
      if (event.including_male_animals) {
        this.predators = this.predators.filter(
          (s) => s.including_male_animals === event.including_male_animals
        );
        this.filterFlag++;
      }
      if (event.id_predators) {
        this.predators = this.filterValue(event, "id_predators", "id_predator");
        this.filterFlag++;
      }
      if (event.id_activities) {
        this.predators = this.filterValue(
          event,
          "id_activities",
          "id_activity"
        );
        this.filterFlag++;
      }
      if (event.id_waters) {
        this.predators = this.filterValue(event, "id_waters", "id_water");
        this.filterFlag++;
      }
      if (event.id_users) {
        this.predators = this.filterValue(event, "id_users", "id_user");
        this.filterFlag++;
      }
      this.modalDialog.close();
      this.loaderData = false;
    }, 20);
  }

  filterValue(parameters: any, parameterKey: string, field: string) {
    let filtered = [];
    for (let i = 0; i < this.predators.length; i++) {
      for (let j = 0; j < parameters[parameterKey].length; j++) {
        if (this.predators[i][field] === parameters[parameterKey][j]) {
          filtered.push(this.predators[i]);
        }
      }
    }
    return filtered;
  }

  approveObservation() {
    this._service
      .callPostMethod("/api/admin/setPredatorToVisible", this.data)
      .subscribe((data) => {
        if (data) {
          this.data.visible = 1;
          this.getPredators();
        }
      });
  }

  refreshGrid() {
    this.data = null;
    this.modalDialog.close();
  }
}
