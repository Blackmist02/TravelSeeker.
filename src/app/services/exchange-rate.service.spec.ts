// src/app/services/exchange-rate.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExchangeRateService]
    });

    service = TestBed.inject(ExchangeRateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener tasas de cambio', () => {
    const mockResponse = {
      conversion_rates: {
        EUR: 0.84,
        GBP: 0.75
      }
    };

    // Llamada al servicio
    service.obtenerTasasDeCambio('USD').subscribe(response => {
      expect(response.conversion_rates).toEqual(mockResponse.conversion_rates);
    });

    // Mock de la solicitud HTTP
    const req = httpMock.expectOne('http://localhost:3000/api/rates/USD');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
