import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasaCambioPageRoutingModule } from './tasa-cambio-routing.module';

import { TasaCambioPage } from './tasa-cambio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasaCambioPageRoutingModule
  ],
  declarations: [TasaCambioPage]
})
export class TasaCambioPageModule {}
