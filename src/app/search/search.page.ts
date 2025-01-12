import { AfterViewChecked, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, WeatherInfoComponent]
})
export class SearchPage implements AfterViewChecked {
  @ViewChild(WeatherInfoComponent) weatherInfoComponent!: WeatherInfoComponent;
  searchCityName: string = '';
  searchedCityName: string = '';
  responseCityName: string = '';
  showWeatherInfo: boolean = false;
  weatherData: any;

  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {
  }

  ngAfterViewChecked(): void {
    if (this.weatherData && this.weatherInfoComponent) {
      this.weatherInfoComponent.weatherData = this.weatherData;
    }
  }

  searchCity() {
    if (this.searchCityName.trim() === '') {
      console.log("Zadej název města");
      return;
    }

    this.httpClient.get(`${API_URL}weather?q=${this.searchCityName}&appid=${API_KEY}&units=metric&lang=cz`)
      .subscribe((response) => {
        console.log(response);
        this.weatherData = response;
        this.showWeatherInfo = true;
        this.responseCityName = this.weatherData.name;
        this.searchedCityName = this.responseCityName;
      }, (error) => {
        console.error('Chyba při vyhledávání města:', error);
        this.showWeatherInfo = false;
      });
  }

  addToFavorites() {
    let favourites = localStorage.getItem('favouriteCities');
    let favouriteCities = favourites ? JSON.parse(favourites) : [];
    if (!favouriteCities.includes(this.responseCityName)) {
      favouriteCities.push(this.responseCityName);
      localStorage.setItem('favouriteCities', JSON.stringify(favouriteCities));
      console.log(`Přidat ${this.responseCityName} do oblíbených`);
    }
  }

  setHomeCity() {
    console.log(`Nastavit ${this.responseCityName} jako domovské město`);
    localStorage.setItem('homeCity', this.responseCityName);
    console.log(localStorage.getItem('homeCity'));
  }

  openCityWeather(searchedCityName: string) {
    this.router.navigate(['/city-details', { city: searchedCityName }]);
  }
}
