//import countryListTpl from './templates/country-list.hbs';

import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener(
  'input',
  debounce(e => {
    onSearch(e);
  }, DEBOUNCE_DELAY)
);

function onSearch(e) {
  const name = e.target.value.trim();

  fetchCountries(name)
    .then(data => {
      clearCountryInfo();
      clearCountryList();

      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }

      renderCountries(data);
    })
    .catch(error => {
      clearCountryList();
      clearCountryInfo();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

const renderCountries = data => {
  if (data.length === 1) {
    clearCountryInfo();
    refs.countryInfo.innerHTML = createInfoCountry(data);
  } else {
    clearCountryList();
    refs.countryList.innerHTML = createListCountries(data);
  }
};

const createListCountries = data => {
  return data
    .map(
      ({ name, flags }) =>
        `<li class="country-list__item"> 
          <img class="country-list__flag" src="${flags.svg}" alt="${name.official}" width="40">
          <p class="country-list__name">${name.official}<p>
        </li>`
    )
    .join('');
};

const createInfoCountry = data => {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1>
        <img src="${flags.png}" alt="${name.official}" width="40">${
        name.official
      }
      </h1>
      <p><span class="country-info--Bold">Capital:</span> ${capital}</p>
      <p><span class="country-info--Bold">Population:</span> ${population}</p>
      <p><span class="country-info--Bold">Languages:</span> ${Object.values(
        languages
      )}</p>`
  );
};

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}
