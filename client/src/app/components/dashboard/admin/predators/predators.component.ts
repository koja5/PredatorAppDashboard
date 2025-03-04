import { Component } from "@angular/core";
import { CallApiService } from "app/services/call-api.service";
import { PredatorModel } from "../../models/predator.model";
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "@kolkov/ngx-gallery";
// import { ImageItem } from "ng-gallery";

@Component({
  selector: "app-predators",
  templateUrl: "./predators.component.html",
  styleUrls: ["./predators.component.scss"],
})
export class PredatorsComponent {
  public predators: any;
  public data: PredatorModel;
  public noDataFound = false;
  public loader = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private _service: CallApiService) {}

  ngOnInit() {
    this._service.callGetMethod("/api/admin/getPredators").subscribe((data) => {
      this.predators = data;
    });

    this.initializeGalleryOptions();
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
    const images = this.data.gallery.split(";");
    this.galleryImages = [];
    for (let i = 0; i < images.length; i++) {
      const image = "https://praedatoren.app/assets/file-storage/" + images[i];
      this.galleryImages.push({
        small: image,
        medium: image,
        big: image,
      });
    }
  }

  submit(event: any) {
    if (event) {
      this.loader = true;
      this.noDataFound = false;
      this._service
        .callGetMethod("/api/admin/getPredatorById", event)
        .subscribe((data: any) => {
          this.data = data;
          this.packImage();
          this.loader = false;
        });
    } else {
      this.data = null;
      this.noDataFound = true;
    }
  }

  imageGallery(event) {
    console.log(event);
  }
}
