import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, WeatherInfoComponent]
})
export class HomePage{
  @ViewChild(WeatherInfoComponent) weatherInfoComponent!: WeatherInfoComponent;
  homeCity: string = '';
  weatherData: any;

  constructor(public httpClient: HttpClient, private cdr: ChangeDetectorRef) {
    this.homeCity = localStorage.getItem('homeCity') || 'Zlín';
    console.log("Domovské město: " + this.homeCity);
  }
  
  ionViewWillEnter() {
    this.loadWeatherData();
  }

  loadWeatherData() {
    this.homeCity = localStorage.getItem('homeCity') || 'Zlín';
    this.httpClient.get(`${API_URL}weather?q=${this.homeCity}&appid=${API_KEY}&units=metric&lang=cz`)
      .subscribe((response) => {
        console.log(response);
        this.weatherData = response;
        if (this.weatherInfoComponent) {
          this.weatherInfoComponent.weatherData(this.weatherData);
          this.cdr.detectChanges(); // Manually trigger change detection
        }
      }, (error) => {
        console.error('Chyba při vyhledávání města:', error);
      });
  }
}
