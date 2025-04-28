import { Routes } from '@angular/router';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountriesMainComponent } from './countries-main/countries-main.component';

export const routes: Routes = [
  { path: 'country-details/:ccn3', component: CountryDetailComponent },
  { path: '', component: CountriesMainComponent },
];
