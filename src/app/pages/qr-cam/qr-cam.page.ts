import { Component, ElementRef, Output, ViewChild, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import jsQR, { QRCode } from 'jsqr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-qr-cam',
  templateUrl: './qr-cam.page.html',
  styleUrls: ['./qr-cam.page.scss'],
  
})
export class QrCamPage implements OnInit {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @Output() scanned: EventEmitter<string> = new EventEmitter<string>();
  @Output() stopped: EventEmitter<void> = new EventEmitter<void>();

  qrData: string = '';
  mediaStream: MediaStream | null = null; // Almacena el flujo de medios

  constructor(private router: Router) { }

  ngOnInit() {
    this.startQrScanningForWeb();
  }

  async startQrScanningForWeb() {
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = this.mediaStream;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    requestAnimationFrame(this.verifyVideo.bind(this));
  }
  async verifyVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.getQrData()) return;
      requestAnimationFrame(this.verifyVideo.bind(this));
    } else {
      requestAnimationFrame(this.verifyVideo.bind(this));
    }
  }

  getQrData(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode  | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      const data = qrCode.data;
      if (data !== '') {
        this.stopCamera();
        this.scanned.emit(qrCode.data);
        // Validar si el contenido es una URL
        if (this.isValidUrl(data)) {
          window.location.href = data; // Redirige al enlace
        } else {
          console.log('El contenido del QR no es una URL válida:', data);
        }
        return true;
      }
    }
    return false;
  }
  isValidUrl(url: string): boolean {
    try {
      new URL(url); // Si no lanza error, es una URL válida
      return true;
    } catch {
      return false;
    }
  }

  stopQrScanning(): void {
    this.stopCamera();
    this.stopped.emit();
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop()); // Detén todas las pistas de video
      this.mediaStream = null; // Limpia el flujo de medios
    }
  }

}
