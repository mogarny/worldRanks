import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  catchError,
  filter,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Country, Joined } from '../model';
import { SharedModuleService } from './shared-module.service';
import { Ripple } from 'primeng/ripple';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(
    private http: HttpClient,
    private state: SharedModuleService,
  ) {}

  urlGenerator(option: string, searchWord: string) {
    return `${this.baseUrl}/${option}/${searchWord}`;
  }

  getCountries(): Observable<Country[]> {
    const state = this.state.currentState;
    if (state.filter) {
      console.log('filter');

      return this.http
        .get<Country[]>(this.urlGenerator('region', state.filter))
        .pipe(
          map((data) => {
            return this.sortByOption(data, state.sort ?? 'population');
          }),
        );
    } else if (state.searchedWord) {
      return this.search(state.searchedWord).pipe(
        map((data) => {
          return this.sortByOption(
            data as Country[],
            state.sort ?? 'population',
          );
        }),
      );
    } else {
      return this.http.get<Country[]>(`${this.baseUrl}/all`).pipe(
        map((data) => {
          return this.sortByOption(
            data as Country[],
            state.sort ?? 'population',
          );
        }),
      );
    }
  }

  private sortByOption(data: Country[], option: string) {
    if (option.toLowerCase() === 'region') {
      return data.sort((a, b) => a.region.localeCompare(b.region));
    } else if (option.toLowerCase() === 'area') {
      return data.sort((a, b) => b.area - a.area);
    } else if (option.toLowerCase() === 'population') {
      return data.sort((a, b) => b.population - a.population);
    }
    return [];
  }

  search(option: string) {
    console.log('here');

    this.state.update({ searchedWord: option });
    this.state.update({ page: 0 });
    console.log(this.state.currentState);

    const joined: Observable<Joined> = forkJoin({
      name: this.http
        .get(this.urlGenerator('name', option))
        .pipe(catchError(() => of(null))),
      region: this.http
        .get(this.urlGenerator('region', option))
        .pipe(catchError(() => of(null))),
      subregion: this.http
        .get(this.urlGenerator('subregion', option))
        .pipe(catchError(() => of(null))),
      code: this.http
        .get(this.urlGenerator('alpha', option))
        .pipe(catchError(() => of(null))),
      lang: this.http
        .get(this.urlGenerator('lang', option))
        .pipe(catchError(() => of(null))),
    });
    return of(
      this.removeDuplicates(
        Object.values(joined)
          .filter((el) => Array.isArray(el))
          .flat(),
      ),
    );
  }

  private removeDuplicates(countries: any[]): any[] {
    const uniqueCountries = new Map();
    countries.forEach((country) => {
      uniqueCountries.set(country.ccn3, country);
    });
    return Array.from(uniqueCountries.values());
  }

  getCountry(ccn3: string) {
    return this.http.get(`https://restcountries.com/v3.1/alpha/${ccn3}`, {
      observe: 'response',
    }) as Observable<HttpResponse<Country>>;
  }
}
