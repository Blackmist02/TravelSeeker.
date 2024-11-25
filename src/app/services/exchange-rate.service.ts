import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private readonly apiUrl = 'https://v6.exchangerate-api.com/v6/e429a40b1214d5d9bf8ad82f/latest/';
  constructor(private http: HttpClient) { }

  obtenerTasasDeCambio(baseCurrency: string): Observable<any>{
    const url = `${this.apiUrl}${baseCurrency}`;
    return this.http.get(url);
  }


}