import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasaCambioPage } from './tasa-cambio.page';

describe('TasaCambioPage', () => {
  let component: TasaCambioPage;
  let fixture: ComponentFixture<TasaCambioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasaCambioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
