import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasa-cambio',
  templateUrl: './tasa-cambio.page.html',
  styleUrls: ['./tasa-cambio.page.scss'],
})
export class TasaCambioPage implements OnInit {
  tasasDeCambio: any;
  errorMessage: string = '';

  constructor(private exchangeRateService: ExchangeRateService, private router: Router) {}

  ngOnInit() {
    this.obtenerTasasDeCambio();
    
  }
  
  // Método para obtener las tasas de cambio
  obtenerTasasDeCambio() {
    this.exchangeRateService.obtenerTasasDeCambio('USD').subscribe(
      (data) => {
        this.tasasDeCambio = data.conversion_rates; // Asumiendo que la API responde con 'conversion_rates'
      },
      (error) => {
        console.error('Error al obtener tasas de cambio', error);
        this.errorMessage = 'No se pudo obtener las tasas de cambio.';
      }
    );
  }
  // Método para obtener las claves de un objeto
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  
}