import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;
const API_ICON_URL = 'https://openweathermap.org/img/wn/';
const API_ICON_EXT = '@2x.png';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FavouritesPage {
  favouriteCities: string[] = [];
  weatherDetails: any[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  ionViewWillEnter() {
    this.loadFavouriteCities();
  }

  loadFavouriteCities() {
    const favourites = localStorage.getItem('favouriteCities');
    if (favourites) {
      this.favouriteCities = JSON.parse(favourites);
      this.loadWeatherDetails();
    }
  }

  removeFavouriteCity(city: string) {
    this.favouriteCities = this.favouriteCities.filter(c => c !== city);
    localStorage.setItem('favouriteCities', JSON.stringify(this.favouriteCities));
    this.loadWeatherDetails();
  }

  loadWeatherDetails() {
    this.weatherDetails = [];
    this.favouriteCities.forEach(city => {
      this.httpClient.get(`${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric&lang=cz`)
        .subscribe((response: any) => {
          this.weatherDetails.push({
            city: city,
            description: response.weather[0].description,
            temp: Math.round(response.main.temp),
            wind_speed: Math.round(response.wind.speed),
            icon_url: `${API_ICON_URL}${response.weather[0].icon}${API_ICON_EXT}`
          });
        });
    });
  }

  setHomeCity(city: string) {
    localStorage.setItem('homeCity', city);
  }

  openCityWeather(city: string) {
    this.router.navigate(['/tabs/city-details', { city: city }]);
  }
}
