import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-qr-cam',
  templateUrl: './qr-cam.page.html',
  styleUrls: ['./qr-cam.page.scss'],
})
export class QrCamPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
  }

}
