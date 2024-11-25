import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrCamPage } from './qr-cam.page';

describe('QrCamPage', () => {
  let component: QrCamPage;
  let fixture: ComponentFixture<QrCamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
