// Selecting HTML elements from details.html
const countryNameDiv = document.getElementById("country-name-details");
const countryFlagDiv = document.getElementById("country-img-details");
const countryPopulationDiv = document.getElementById(
  "country-population-details",
);
const countryRegionDiv = document.getElementById("country-region-details");
const countrySubRegionDiv = document.getElementById(
  "country-subregion-details",
);
const countryCapitalDiv = document.getElementById("country-capital-details");
const countryCurrenciesDiv = document.getElementById(
  "country-currencies-details",
);
const countryLanguagesDiv = document.getElementById(
  "country-languages-details",
);

function loadCountryDetails() {
  const params = new URLSearchParams(window.location.search);
  let countryName = params.get("name");
  let countryFlagPath = params.get("flag");
  let countryPopulation = params.get("population");
  let countryRegion = params.get("region");
  let countrySubRegion = params.get("subregion");
  let countryCapital = params.get("capital");
  let countryCurrencies = params.get("currencies");
  let countryLanguages = params.get("languages");

  countryNameDiv.innerHTML = countryName;
  countryNameDiv.style.alignSelf = "center";
  countryFlagDiv.src = countryFlagPath;
  countryFlagDiv.style.maxWidth = "500px";
  countryPopulationDiv.innerHTML = "<b>Population: </b>" + countryPopulation;
  countryRegionDiv.innerHTML = "<b>Region: </b>" + countryRegion;
  countrySubRegionDiv.innerHTML = "<b>Subregion: </b>" + countrySubRegion;

  countryCapitalDiv.innerHTML = "<b>Capital: </b>" + countryCapital;
  countryCurrenciesDiv.innerHTML = "<b>Currencies: </b>" + countryCurrencies;
  countryLanguagesDiv.innerHTML = "<b>Languages: </b>" + countryLanguages;
}

function backButtonHandler() {
  window.location.href = "index.html";
}

// Back button
let backButton = document.getElementById("back-btn");
backButton.addEventListener("click", backButtonHandler);

document.addEventListener("DOMContentLoaded", loadCountryDetails);
