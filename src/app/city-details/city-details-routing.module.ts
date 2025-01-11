import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityDetailsPage } from './city-details.page';

const routes: Routes = [
  {
    path: '',
    component: CityDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityDetailsPageRoutingModule {}
