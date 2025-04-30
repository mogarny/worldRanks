export interface Country {
  altSpellings: string[];
  area: number;
  capital: string[];
  capitalInfo: {
    latlng: number[];
  };
  car: {
    signs: string[];
    side: string;
  };
  cca2: string;
  cca3: string;
  ccn3: string;
  coatOfArms: Record<string, unknown>;
  continents: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
  };
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  independent: boolean;
  landlocked: boolean;
  languages: {
    [key: string]: string;
  };
  latlng: number[];
  maps: {
    googleMaps: string;
    openStreetMaps?: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: string[];
  tld: string[];
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  unMember: boolean | null;
}

export interface Store {
  page?: number;
  filter?: string;
  sort?: string;
  searchedWord?: string;
  loading?: boolean;
}

export type PossibleError<T> = T | 'error';
