import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "../../@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CallApiService } from "app/services/call-api.service";
import { HelpService } from "app/services/help.service";
import { CoreSidebarComponent } from "@core/components/core-sidebar/core-sidebar.component";

@Component({
  selector: "app-all-observation-reports",
  templateUrl: "./all-observation-reports.component.html",
  styleUrls: ["./all-observation-reports.component.scss"],
})
export class AllObservationReportsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("sidebar") sidebar: CoreSidebarComponent;

  public path = "grids/admin";
  public file = "all-observation-reports.json";
  public selectedFilter = {
    name: "allObservationReports.allObservations",
    value: 3,
  };
  public data: any;
  public allData: any;
  public customFilter = [
    {
      name: "allObservationReports.approvedObservations",
      value: 1,
    },
    {
      name: "allObservationReports.unapprovedObservations",
      value: 2,
    },
    { name: "allObservationReports.allObservations", value: 3 },
  ];
  public selectedRow: any;

  constructor(
    private _service: CallApiService,
    private _helpService: HelpService
  ) {}

  ngOnInit() {
    this._service
      .callGetMethod("/api/admin/getPredatorRequests")
      .subscribe((data) => {
        this.allData = this._helpService.copyObject(data);
        this.data = data;
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
    this.sidebar.close();
  }
}
