import { Injectable } from '@angular/core';
import {HttpClient , } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  baseApiUrl = "https://color-palette-back.omarhajjouji.tn/transform";
  constructor(private http:HttpClient) {}


  upload(image: any):Observable<any>{
    const formData = new FormData();
    formData.append('image',image,image.name);
    return this.http.post(this.baseApiUrl, formData,{ responseType: 'blob' });
  }


}
