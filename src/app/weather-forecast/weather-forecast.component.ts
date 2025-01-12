import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class WeatherForecastComponent implements AfterViewInit {
  @Input() forecastData: any;

  swiperConfig: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 0,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  ngAfterViewInit() {
    new Swiper('.swiper-container', this.swiperConfig);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.\u00A0${month}.\u00A0${year}\u00A0${hours}:${minutes}`;
  }

  round(value: number): number {
    return Math.round(value);
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}