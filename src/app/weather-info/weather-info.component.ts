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
    @Input() icon_url: string | undefined;
    @Input() description: string | undefined;
    @Input() pressure: number | undefined;
    @Input() humidity: number | undefined;
    @Input() wind_speed: number | undefined;
    @Input() wind_deg: number | undefined;
    @Input() wind_direction: string | undefined;
    @Input() cityName: string | undefined;
    @Input() temp: number | undefined;
    @Input() feels_like: number | undefined;
    @Input() temp_min: number | undefined;
    @Input() temp_max: number | undefined;

    weatherData(response: any) {
        const API_ICON_URL = 'https://openweathermap.org/img/wn/';
        const API_ICON_EXT = '@2x.png';

        this.cityName = response.name;
        this.temp = Math.round(response.main.temp);
        this.description = response.weather[0].description;
        this.icon_url = `${API_ICON_URL}${response.weather[0].icon}${API_ICON_EXT}`;
        this.feels_like = response.main.feels_like;
        this.temp_min = Math.round(response.main.temp_min);
        this.temp_max = Math.round(response.main.temp_max);
        this.pressure = response.main.pressure;
        this.humidity = response.main.humidity;
        this.wind_speed = Math.round(response.wind.speed);
        this.wind_deg = response.wind.deg;
        if (this.wind_deg !== undefined) {
            this.wind_direction = this.getWindDirection(this.wind_deg);
        }
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