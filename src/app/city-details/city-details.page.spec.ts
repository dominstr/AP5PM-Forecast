import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityDetailsPage } from './city-details.page';

describe('CityDetailsPage', () => {
  let component: CityDetailsPage;
  let fixture: ComponentFixture<CityDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
