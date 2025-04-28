import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesMainComponent } from './countries-main.component';

describe('CountriesMainComponent', () => {
  let component: CountriesMainComponent;
  let fixture: ComponentFixture<CountriesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
