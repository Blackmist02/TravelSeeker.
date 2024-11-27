import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  reservarVuelo() {
    console.log('Reservando...');
  }

}
