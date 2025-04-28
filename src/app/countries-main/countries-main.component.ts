import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Country } from '../../model';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { RouterModule } from '@angular/router';
import { SharedModuleService } from '../../services/shared-module.service';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-countries-main',
  imports: [
    HttpClientModule,
    CommonModule,
    FloatLabelModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    AutoCompleteModule,
    DropdownModule,
    TableModule,
    SelectModule,
    RouterModule,
    PaginatorModule,
    SkeletonModule,
  ],
  templateUrl: './countries-main.component.html',
  styleUrl: './countries-main.component.scss',
})
export class CountriesMainComponent implements OnInit {
  countries: Country[] = [];
  totalCount: number = 0;
  searchBy: string = '';
  sortBy: string = '';
  filteredItems: string[] = ['Population', 'Region', 'Area'];
  first: number = 0;
  currentPage: number = 0;
  countriesPerPage: number = 7;
  loadingData = Array(this.countriesPerPage).fill({});

  constructor(
    private api: DataService,
    public state: SharedModuleService,
  ) {
    this.sortBy = this.filteredItems[0];
    this.state.update({ loading: true });
    console.log(this.state.currentState);
  }

  onPageChange(event: any): void {
    this.currentPage = event.first / 7;
    this.state.update({ page: this.currentPage });
    console.log(this.state.currentState);
  }

  fetchByRegion(region: string) {
    this.state.update({ loading: true });
    this.state.update({ filter: region, page: 0 });
    this.first = 0;
    console.log(this.state.currentState, this.countriesPerPage);

    this.api.getCountries().subscribe({
      next: (data) => {
        console.log(data);
        if (data !== null) {
          this.state.update({ loading: false });
          console.log(this.state.currentState);

          this.countries = data;
          this.totalCount = this.countries.length;
          console.log(this.countries);
        }
      },
    });
  }

  search(e: KeyboardEvent, searchedWord?: string) {
    if (e.key === 'Enter') {
      this.state.update({ loading: true });
      this.api.getCountries().subscribe({
        next: (data) => {
          this.state.update({ page: this.currentPage, loading: false });
          this.countries = data;
          this.totalCount = this.countries.length;
          console.log('Fetched Data:', this.countries);
        },
        error: (err) => {
          console.log('Error fetching country data:', err);
        },
      });
    }
  }

  onOptionChange() {
    this.state.update({ sort: this.sortBy, loading: true });
    this.api.getCountries().subscribe((response) => {
      if (response !== null) {
        this.state.update({ loading: false });
        this.countries = response;
        this.first = 0;
      }
    });
  }

  ngOnInit() {
    console.log(this.state.currentState);
    if (this.state.currentState.sort) {
      this.sortBy = this.state.currentState.sort;
    }

    this.state.state$.subscribe((state) => {
      if (state.page) {
        this.first = state.page * this.countriesPerPage;
      }
    });

    this.api.getCountries().subscribe((data) => {
      this.state.update({ loading: false });
      this.countries = data;
      this.totalCount = this.countries.length;
    });
  }
}
