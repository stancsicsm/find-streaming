interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface CountryProviders {
  link: string;
  flatrate?: Provider[];
}

interface ProvidersResponse {
  id: number;
  results: {
    [countryCode: string]: CountryProviders;
  };
}

export type { Provider, CountryProviders, ProvidersResponse };