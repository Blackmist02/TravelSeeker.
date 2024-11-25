import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrCamPageRoutingModule } from './qr-cam-routing.module';

import { QrCamPage } from './qr-cam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCamPageRoutingModule
  ],
  declarations: [QrCamPage]
})
export class QrCamPageModule {}
