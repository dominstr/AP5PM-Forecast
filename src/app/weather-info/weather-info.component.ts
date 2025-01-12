import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-weather-info',
    templateUrl: './weather-info.component.html',
    styleUrls: ['./weather-info.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule]
})
export class WeatherInfoComponent {
    @Input() weatherData: any;

    get icon_url(): string {
      return `https://openweathermap.org/img/wn/${this.weatherData?.weather[0].icon}@2x.png`;
    }
  
    get description(): string {
      return this.weatherData?.weather[0].description;
    }
  
    get pressure(): number {
      return this.weatherData?.main.pressure;
    }
  
    get humidity(): number {
      return this.weatherData?.main.humidity;
    }
  
    get wind_speed(): number {
      return Math.round(this.weatherData?.wind.speed);
    }
  
    get wind_deg(): number {
      return this.weatherData?.wind.deg;
    }
  
    get wind_direction(): string {
      return this.getWindDirection(this.weatherData?.wind.deg);
    }
  
    get cityName(): string {
      return this.weatherData?.name;
    }
  
    get temp(): number {
      return Math.round(this.weatherData?.main.temp);
    }
  
    get feels_like(): number {
      return Math.round(this.weatherData?.main.feels_like);
    }
  
    get temp_min(): number {
      return Math.round(this.weatherData?.main.temp_min);
    }
  
    get temp_max(): number {
      return Math.round(this.weatherData?.main.temp_max);
    }
  
    get main(): string {
      return this.weatherData?.weather[0].main;
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

    capitalizeFirstLetter(text: string): string {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
}