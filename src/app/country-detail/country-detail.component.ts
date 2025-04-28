import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/service';
import { Country } from '../../model';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ObjectValuesPipe } from '../object-values.pipe';
import { JoinPipe } from '../join.pipe';

@Component({
  selector: 'app-country-detail',
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    ObjectValuesPipe,
    JoinPipe,
  ],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent {
  ccn3: string = '';
  country: Country | null = null;

  constructor(
    private route: ActivatedRoute,
    private servis: DataService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.ccn3 = params.get('ccn3') || '';
    });
    if (this.ccn3) {
      this.servis.getCountry(this.ccn3).subscribe({
        next: (data) => {
          if (Array.isArray(data.body) && data.body.length > 0) {
            this.country = data.body[0] as Country;
          }
        },
      });
    }
  }
}
