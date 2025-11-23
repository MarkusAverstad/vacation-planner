type Flags = {
  alt: string;
  png: string;
  svg: string;
};

export type GiniRecord = Record<string, number>;
export type GiniData = { year: string; score: number };
export type GiniFilter = { min: number; max: number };

export type CountryListResponse = {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  flags: Flags;
  population: number;
  gini: GiniRecord;
};

export type CountryListData = {
  code: string;
  name: string;
  flags: Flags;
  population: number;
  gini: GiniData | null;
};

export type CountryResponse = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    [languageCode: string]: string;
  };
  latlng: [number, number];
  landlocked: boolean;
  area: number;
  demonyms: {
    [languageCode: string]: {
      f: string;
      m: string;
    };
  };
  translations: {
    [languageCode: string]: {
      official: string;
      common: string;
    };
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: [number, number];
  };
  postalCode: {
    format: string | null;
    regex: string | null;
  };
};
