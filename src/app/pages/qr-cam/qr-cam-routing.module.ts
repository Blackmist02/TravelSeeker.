import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrCamPage } from './qr-cam.page';

const routes: Routes = [
  {
    path: '',
    component: QrCamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrCamPageRoutingModule {}
