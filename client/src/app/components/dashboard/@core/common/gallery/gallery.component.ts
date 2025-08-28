import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
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
  @Input() editMode = true;
  @Output() changeEmit = new EventEmitter();

  public isGalleryOpen = false;
  files: any[] = [];
  public imageFromCamera: any;

  constructor(private _translate: TranslateService) {}

  ngOnInit() {
    if (this.value) {
      if (typeof this.value == "string") {
        if (this.value.startsWith("data:image")) {
          this.imageFromCamera = this.b64toBlob(
            this.value.split("data:image/jpeg;base64,")[1]
          );
          this.packImagesToGallery(this.imageFromCamera);
          this.appendFormData();
        } else if (this.value.indexOf(";") != -1) {
          const gallery = this.convertGalleryStringToGalleryArray();
          for (let i = 0; i < gallery.length; i++) {
            this.gallery.push(environment.GALLERY_STORAGE + gallery[i]);
          }
        } else if (this.value.startsWith("blob:")) {
          this.gallery.push(this.value);
        } else if (this.value.startsWith("https://localhost")) {
          this.gallery.push(this.value);
        } else {
          this.gallery.push(environment.GALLERY_STORAGE + this.value);
        }
      }
    }
  }

  ngOnChanges() {
    // this.gallery = [];
    // if (this.value) {
    //   if (this.value.indexOf(';') != -1) {
    //     const gallery = this.convertGalleryStringToGalleryArray();
    //     for (let i = 0; i < gallery.length; i++) {
    //       this.gallery.push(environment.GALLERY_STORAGE + gallery[i]);
    //     }
    //   } else {
    //     if (typeof this.value == 'string') {
    //       if (this.value.startsWith('data:image')) {
    //         this.gallery.push(this.value);
    //         this.changeEmit.emit({
    //           gallery: this.convertGalleryArrayToGalleryString(),
    //           uploaded: this.files,
    //         });
    //       } else {
    //         this.gallery.push(environment.GALLERY_STORAGE + this.value);
    //       }
    //     }
    //   }
    //   this.packImageForPreview();
    // }
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
    this.gallery.push(URL.createObjectURL(image));
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
