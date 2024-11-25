import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasaCambioPage } from './tasa-cambio.page';

const routes: Routes = [
  {
    path: '',
    component: TasaCambioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasaCambioPageRoutingModule {}
