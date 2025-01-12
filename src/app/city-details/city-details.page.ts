import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.page.html',
  styleUrls: ['./city-details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, WeatherInfoComponent, WeatherForecastComponent]
})
export class CityDetailsPage{
  @ViewChild(WeatherInfoComponent) weatherInfoComponent!: WeatherInfoComponent;
  detailedCity: string = '';
  weatherData: any;
  forecastData: any;
  defaultHref: string = '';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cdr: ChangeDetectorRef, private router: Router) { }

  ionViewWillEnter() {
    this.detailedCity = this.route.snapshot.paramMap.get('city') || '';
    this.defaultHref = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString() || '/tabs/search';
    this.loadWeatherData();
    console.log("Detail města: " + this.detailedCity);
    this.loadForecastData();

    console.log(this.router.getCurrentNavigation());
  }

  loadWeatherData() {
    this.httpClient.get(`${API_URL}weather?q=${this.detailedCity}&appid=${API_KEY}&units=metric&lang=cz`)
      .subscribe((response) => {
        console.log(response);
        this.weatherData = response;
        if (this.weatherInfoComponent) {
          this.weatherInfoComponent.weatherData = this.weatherData;
          this.cdr.detectChanges(); // Manually trigger change detection
        }
      }, (error) => {
        console.error('Chyba při vyhledávání města:', error);
      });
  }

  loadForecastData() {
    this.httpClient.get(`${API_URL}forecast?q=${this.detailedCity}&appid=${API_KEY}&units=metric&lang=cz`)
    .subscribe((responseForecast) => {
      console.log(responseForecast);
      this.forecastData = responseForecast;
    }, (error) => {
      console.error('Chyba při vyhledávání města:', error);
    });
  }

}