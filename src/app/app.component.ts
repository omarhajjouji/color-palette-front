import { Component } from '@angular/core';
import { ImageUploadService } from './image-upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  
  title = 'color-palette';
  file: File | undefined;
  thumbnail= this.sanitizer.bypassSecurityTrustUrl('/assets/color-palette-initial.jpg');
  loading = false;
  selected=false;
  generate_message = "Generate Image"
  constructor(private imageUploadService:ImageUploadService,private sanitizer: DomSanitizer){}
  
  setFileName(event:any){
    this.file=event.target.files[0];
    if(this.file && (this.file?.size > 10*2**20)){
      this.selected=false;
      alert("Image Size Must Be Under 10 Mb")
      this.fileInput.nativeElement.value = null;
      this.file=undefined;
    }else{
      this.selected=true;
      let objectURL = URL.createObjectURL(this.file);
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }

  }

  uploadImage(){ 
    this.loading = true;
    this.imageUploadService.upload(this.file).subscribe(
      (response)=>{
        let objectURL = URL.createObjectURL(response);
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.loading = false;
        this.generate_message = "Generate Image" ;
        
      },
      
      err =>{this.loading=false;
             alert("Sorry, We Had Trouble Generating Your Image Please Try Again");
      }
    );
  }

imageToShow: any;

createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}
}
