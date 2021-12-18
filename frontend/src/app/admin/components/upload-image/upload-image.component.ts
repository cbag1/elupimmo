import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  isDraggedOver = false;
  files: File[] = [];
  totalFilesCount = 0;
  urls: any[]= [];
  @Output() filesLoaded = new EventEmitter<File[]>();

  constructor() { }

  ngOnInit(): void {
  }

  handleDrop(event: DragEvent) {
    this.stopDefault(event);
    this.isDraggedOver = false;
    this.totalFilesCount = event.dataTransfer.files.length;
    // this.files = this.getImages(event.dataTransfer.files);
    // this.files.push.apply(this.getImages(event.dataTransfer.files));
    this.filesLoaded.emit(this.files);
    // console.log("test drop");
    // console.log(this.getImages(event.dataTransfer.files));
    // console.log(this.files);
    // console.log(Object.values(Object.keys(event.dataTransfer.files)));

    Object.entries(Object.values(event.dataTransfer.files)).forEach(([key, value]) => {
      // console.log(key, value);
      this.files.push(value);

      var reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = (event) => {
        this.urls.push(event.target.result);
      }
    });

    console.log(this.files);


  }

  handleDragOver(event: Event) {
    this.stopDefault(event);
    this.isDraggedOver = true;
    console.log("test dragover");

  }

  handleDragEnter() {
    this.isDraggedOver = true;
    console.log("test drag enter");

  }

  handleDragLeave() {
    this.isDraggedOver = false;
    console.log("test drag leave");

  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.totalFilesCount = fileInput.files.length;
    this.files = this.getImages(fileInput.files);
    this.filesLoaded.emit(this.files);
  }

  getImages(files: FileList): File[] {
    return Array.from(files).filter(
      (file) => ['image/png', 'image/jpeg'].indexOf(file.type) > -1
    );
  }

  private stopDefault(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

}
