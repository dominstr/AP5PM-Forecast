import { Component } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

interface WeatherResponse {
  weather: {
    main: string;
    description: string;
    icon: string;
  };

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };

  clouds: {
    all: number;
  };

  sys: {
  };

  timezone: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  weather: any;

  constructor(public httpClient:HttpClient) {
    this.forecastForCity();
  }

  forecastForCity(){
    this.httpClient.get<WeatherResponse>(`${API_URL}weather?q=${"Polešovice"}&appid=${API_KEY}&units=metric&lang=cz`)
    .subscribe((response) => {
      console.log(response);
      this.weather = response.main;
      console.log(this.weather);
    });
  }


}
