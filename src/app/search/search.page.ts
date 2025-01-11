import { AfterViewChecked, Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

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
  cityName: string = '';
  showWeatherInfo: boolean = false;
  weatherData: any;

  constructor(private httpClient: HttpClient) { }

  ngAfterViewChecked(): void {
    if (this.weatherData && this.weatherInfoComponent) {
      this.weatherInfoComponent.weatherData(this.weatherData);
      this.weatherData = null;  // Reset weatherData to prevent multiple calls
    }
  }

  searchCity() {
    if (this.cityName.trim() === '') {
      console.log("Zadej název města");
      return;
    }

    this.httpClient.get(`${API_URL}weather?q=${this.cityName}&appid=${API_KEY}&units=metric&lang=cz`)
      .subscribe((response) => {
        console.log(response);
        this.weatherData = response;
        this.showWeatherInfo = true;
      }, (error) => {
        console.error('Chyba při vyhledávání města:', error);
        this.showWeatherInfo = false;
      });
  }
}
