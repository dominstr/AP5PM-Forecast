import { Component } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;
const API_ICON_URL =  'https://openweathermap.org/img/wn/';
const API_ICON_EXT =  '@2x.png';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, WeatherInfoComponent]
})
export class HomePage {
  response_main: any
  response_wind: any
  response_weather: any
  todayDate = new Date()
  cityName: any
  temp: any;  // teplota
  main: any;  // hlavní popis
  description: any;  // podrobnější popis
  icon: any;
  feels_like: any;  // pocitová teplota
  temp_min: any;
  temp_max: any;
  pressure: any;
  humidity: any;
  wind_speed: any;
  wind_deg: any;  // směr větru
  wind_direction: string | undefined;
  icon_url: string | undefined;


  constructor(public httpClient:HttpClient) {
    this.forecastForCity();
  }

  forecastForCity(){
    this.httpClient.get(`${API_URL}weather?q=${"Polešovice"}&appid=${API_KEY}&units=metric&lang=cz`)
    .subscribe((response) => {
      this.response_main = response['main' as keyof typeof response];
      this.response_wind = response['wind' as keyof typeof response];
      this.response_weather = response['weather' as keyof typeof response];

      this.cityName = response['name' as keyof typeof response]
      this.temp = this.response_main.temp;
      this.main = this.response_weather[0].main;
      this.description = this.response_weather[0].description;
      this.icon = this.response_weather[0].icon;
      this.icon_url = `${API_ICON_URL}${this.icon}${API_ICON_EXT}`;

      this.feels_like = this.response_main.feels_like;
      this.temp_min = this.response_main.temp_min;
      this.temp_max = this.response_main.temp_max;
      this.pressure = this.response_main.pressure;
      this.humidity = this.response_main.humidity;

      this.wind_speed = this.response_wind.speed;
      this.wind_deg = this.response_wind.deg;
      this.wind_direction = this.getWindDirection(this.wind_deg);
     
      console.log(response);
      console.log(this.response_main);

      console.log("Město: " + this.cityName);
      console.log("Teplota: " + this.temp + " °C");
      console.log("Počasí: " + this.main);
      console.log("Podrobnosti: " + this.description);
      console.log("Pocitová teplota: " + this.feels_like + " °C");
      console.log("Nejnižší teplota: " + this.temp_min + " °C");
      console.log("Nejvyšší teplota: " + this.temp_max + " °C");
      console.log("Tlak: " + this.pressure + " hPa");
      console.log("Vlhkost vzduchu: " + this.humidity + " %");
      console.log("Rychlost větru: " + this.wind_speed + " m/s");
      console.log("Směr větru: " + this.wind_deg + "° -> "+ this.wind_direction);

      console.log(this.response_weather);
      console.log("Ikona: " + this.icon_url);
    });
  }

  getWindDirection(deg: number): string {
    if (deg > 337.5 || deg <= 22.5) {
      return 'S';
    } else if (deg > 22.5 && deg <= 67.5) {
      return 'SV';
    } else if (deg > 67.5 && deg <= 112.5) {
      return 'V';
    } else if (deg > 112.5 && deg <= 157.5) {
      return 'JV';
    } else if (deg > 157.5 && deg <= 202.5) {
      return 'J';
    } else if (deg > 202.5 && deg <= 247.5) {
      return 'JZ';
    } else if (deg > 247.5 && deg <= 292.5) {
      return 'Z';
    } else if (deg > 292.5 && deg <= 337.5) {
      return 'SZ';
    } else {
      return '';
    }
  }
}
