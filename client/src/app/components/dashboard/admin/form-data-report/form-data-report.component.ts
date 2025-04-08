import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "@kolkov/ngx-gallery";

@Component({
  selector: "app-form-data-report",
  templateUrl: "./form-data-report.component.html",
  styleUrls: ["./form-data-report.component.scss"],
})
export class FormDataReportComponent {
  @Input() data: any;
  @Output() showQuestionModalEmit = new EventEmitter<null>();
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[] = [];

  ngOnInit() {
    this.initializeGalleryOptions();
  }

  ngOnChanges() {
    this.packImage();
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

  showQuestionModel() {
    this.showQuestionModalEmit.emit();
  }
}
