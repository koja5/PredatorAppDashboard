import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CallApiService } from "app/services/call-api.service";
import { HelpService } from "app/services/help.service";
import { CoreSidebarComponent } from "@core/components/core-sidebar/core-sidebar.component";
import { ToastrComponent } from "../../@core/common/toastr/toastr.component";
import { DialogConfirmComponent } from "../../@core/common/dialog-confirm/dialog-confirm.component";

@Component({
  selector: "app-all-observation-reports",
  templateUrl: "./all-observation-reports.component.html",
  styleUrls: ["./all-observation-reports.component.scss"],
})
export class AllObservationReportsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("sidebar") sidebar: CoreSidebarComponent;
  @ViewChild("sidebarNew") sidebarNew: CoreSidebarComponent;
  @ViewChild("dialogConfirm")
  dialogConfirm: DialogConfirmComponent;

  public path = "grids/admin";
  public file = "all-observation-reports.json";
  public selectedFilter = {
    name: "allObservationReports.allObservations",
    value: 3,
  };
  public data: any;
  public allData: any;
  public customFilter = [
    { name: "allObservationReports.allObservations", value: 3 },
    {
      name: "allObservationReports.approvedObservations",
      value: 1,
    },
    {
      name: "allObservationReports.unapprovedObservations",
      value: 2,
    },
  ];
  public selectedRow: any;
  public loader = false;

  constructor(
    private _service: CallApiService,
    private _helpService: HelpService,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.getPredatorRequests();
  }

  getPredatorRequests() {
    this.loader = true;
    this._service
      .callGetMethod("/api/admin/getPredatorRequests")
      .subscribe((data) => {
        this.allData = this._helpService.copyObject(data);
        this.data = data;
        this.loader = false;
      });
  }

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }

  changeCustomFilter(event: any) {
    if (event) {
      if (event.value === 1) {
        this.data = this.allData.filter((r) => r.visible == 1);
      } else if (event.value === 2) {
        this.data = this.allData.filter((r) => r.visible == 0);
      } else {
        this.data = this.allData;
      }
    } else {
      this.data = this.allData;
    }
  }

  emitValue(event: any) {
    this.selectedRow = event;
    this.sidebar.open();
  }

  closeSidebar() {
    this.selectedRow = null;
    this.sidebar.close();
  }

  closeSidebarNew() {
    this.selectedRow = null;
    this.sidebarNew.close();
  }

  openedChangedEvent(event: any) {
    if (!event) {
      this.closeSidebar();
    }
  }

  showQuestionModal() {
    this.dialogConfirm.showQuestionModal();
  }

  approveObservation(event: any) {
    this._service
      .callPostMethod("/api/admin/setPredatorToVisible", event)
      .subscribe((data) => {
        if (data) {
          this.closeSidebar();
          this._toastr.showSuccess();
          this.getPredatorRequests();
        }
      });
  }

  deleteObservationReport() {
    this._service
      .callPostMethod("/api/admin/deletePredator", this.selectedRow)
      .subscribe((data) => {
        if (data) {
          this.closeSidebar();
          this._toastr.showSuccess();
          this.getPredatorRequests();
        }
      });
  }

  openParentForm() {
    this.selectedRow = {};
    this.sidebarNew.open();
  }

  refreshGrid() {
    this.closeSidebar();
    this.closeSidebarNew();
    this.getPredatorRequests();
  }
}
