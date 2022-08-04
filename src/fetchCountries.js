export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const FILTER = 'fields=name,capital,population,flags,languages';
  const URL = `${BASE_URL}${name}?${FILTER}`;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
