import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "@kolkov/ngx-gallery";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "environments/environment";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
  standalone: false,
})
export class GalleryComponent implements OnInit {
  @Input() value: any;
  @Input() images: any;
  @Input() gallery: any[] = [];
  @Input() editable = true;
  @Output() changeEmit = new EventEmitter();
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: "600px",
      height: "400px",
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
  galleryImages: NgxGalleryImage[] = [];

  public isGalleryOpen = false;
  files: any[] = [];
  public imageFromCamera: any;
  selectedItem: any = null;

  constructor() {}

  ngOnInit() {
    if (this.value && this.value != "null") {
      if (typeof this.value == "string") {
        if (this.value.startsWith("data:image")) {
          this.imageFromCamera = this.b64toBlob(
            this.value.split("data:image/jpeg;base64,")[1]
          );
          this.packImagesToGallery(this.imageFromCamera);
          this.appendFormData();
        } else if (this.value.indexOf(";") != -1) {
          this.packGallery();
        } else if (this.value.startsWith("blob:")) {
          this.gallery.push(this.value);
        } else if (this.value.startsWith("https://localhost")) {
          this.gallery.push(this.value);
        } else {
          const file = environment.GALLERY_STORAGE + this.value;
          this.pushToGallery(file);
        }
      }
    }
  }

  packGallery() {
    this.gallery = [];
    if (this.value) {
      const items = this.value.split(";").filter(Boolean);
      for (const fileName of items) {
        const fileUrl = environment.GALLERY_STORAGE + fileName;
        this.pushToGallery(fileUrl);
      }
    }
  }

  pushToGallery(file: any, extension?: string) {
    const ext = extension ? extension : file.split(".").pop()?.toLowerCase();
    if (
      ["jpg", "jpeg", "png", "gif", "webp"].some((type) => ext.includes(type))
    ) {
      this.gallery.push({ type: "image", src: file });
    } else if (
      ["mp4", "mov", "avi", "mkv", "webm"].some((type) => ext.includes(type))
    ) {
      this.gallery.push({ type: "video", src: file });
    }
  }

  openLightbox(item: any) {
    this.selectedItem = item;
  }

  closeLightbox() {
    this.selectedItem = null;
  }

  prevItem() {
    if (!this.selectedItem) return;
    const index = this.gallery.indexOf(this.selectedItem);
    this.selectedItem =
      this.gallery[(index - 1 + this.gallery.length) % this.gallery.length];
  }

  nextItem() {
    if (!this.selectedItem) return;
    const index = this.gallery.indexOf(this.selectedItem);
    this.selectedItem = this.gallery[(index + 1) % this.gallery.length];
  }

  fileBrowseHandler(events: any) {
    this.prepareFilesList(events.files);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      this.packImagesToGallery(item);
    }
    this.appendFormData();
  }

  initializeAllAndKeepFromCamera() {
    let ind = 1;
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].name === "fromCamera.jpeg") {
        ind = 0;
        if (i > 1) {
          this.files.splice(0, i - 1);
        }
        if (i < this.files.length) {
          this.files.slice(i + 1, this.files.length);
        }
      }
    }
    if (ind) {
      this.files = [];
    }
  }

  appendFormData() {
    let formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      formData.append("files[]", this.files[i], this.files[i].name);
    }

    this.changeEmit.emit({
      gallery: this.gallery,
      uploaded: this.files,
    });
  }

  packImagesToGallery(image: any) {
    // this.gallery.push(URL.createObjectURL(image));
    // this.galleryImages.push({
    //   small: URL.createObjectURL(image),
    //   medium: URL.createObjectURL(image),
    //   big: URL.createObjectURL(image),
    // });

    this.pushToGallery(URL.createObjectURL(image), image.type);
  }

  checkIsImageInGallery(image: any) {
    for (let i = 0; i < this.gallery.length; i++) {
      if (this.gallery[i] === image) {
        return true;
      }
    }
    return false;
  }

  removePhoto(index: number) {
    this.gallery.splice(index, 1);
    this.files.splice(index, 1);
    this.changeEmit.emit({
      gallery: this.convertGalleryArrayToGalleryString(),
      uploaded: this.files,
    });
  }

  convertGalleryStringToGalleryArray() {
    return this.value.split(";");
  }

  convertGalleryArrayToGalleryString() {
    let gallery = "";
    for (let i = 0; i < this.gallery.length; i++) {
      if (this.gallery[i].includes(environment.GALLERY_STORAGE)) {
        gallery += this.gallery[i].split(environment.GALLERY_STORAGE)[1];
        if (i < this.gallery.length - 1) {
          gallery += ";";
        }
      }
    }
    return gallery;
  }

  b64toBlob(b64Data: any, contentType: string = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
