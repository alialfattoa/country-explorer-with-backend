const countryCardsContainer = document.getElementById(
  "country-cards-container",
);

const countryNameInput = document.getElementById("country-name-input");
const regionInput = document.getElementById("region-input");
const populationInput = document.getElementById("population-input");
const showMoreButton = document.getElementById("show-more-btn");
const errorMessageArea = document.getElementById("error-message");
// Initial 12 countries to display
const initialCountries = [];

let countries = data;

let startDisplayCount = 0;
let displayCount = 12;

function populateCountryCards(countries) {
  console.log("Display Count: " + displayCount); // For debugging
  if (displayCount >= 27 || displayCount >= countries.length) {
    displayCount = countries.length;
    showMoreButton.style.display = "none";
  } else if (displayCount < 12) {
    showMoreButton.style.display = "none";
  } else {
    showMoreButton.style.display = "block";
  }
  countryCardsContainer.innerHTML = "";
  console.log("Countries Length: " + countries.length); // For debugging

  // Display message if no countries found
  if (countries.length == 0) {
    let helpMessage = document.createElement("p");
    let countryNotFoundMessage =
      "No country found matching the search criteria.";
    helpMessage.textContent = countryNotFoundMessage;
    countryCardsContainer.appendChild(helpMessage);
    return;
  }

  for (let i = 0; i < displayCount; i++) {
    // Individual country card container
    let countryCard = document.createElement("div");
    countryCard.id = "country-card";
    countryCard.style.border = "1px solid black";
    countryCard.style.backgroundColor = "#E0E0E0";
    countryCard.style.paddingLeft = "28.8px";

    let countryFlag = document.createElement("img");
    countryFlag.src = countries[i].flags.png;
    countryFlag.alt = countries[i].name.common + " Flag";
    countryFlag.style.width = "200px";
    countryFlag.style.height = "105px";
    countryFlag.style.paddingTop = "28.8px";
    countryCard.appendChild(countryFlag);

    let countryName = document.createElement("h2");
    countryName.textContent = countries[i].name.official;
    countryCard.appendChild(countryName);

    let countryPopulation = document.createElement("p");
    countryPopulation.innerHTML =
      "<b>Population: </b>" + countries[i].population;
    countryCard.appendChild(countryPopulation);

    let countryCapital = document.createElement("p");
    countryCapital.innerHTML = "<b>Capital: </b>" + countries[i].capital;
    countryCard.appendChild(countryCapital);

    let countryRegion = document.createElement("p");
    countryRegion.innerHTML = "<b> Region: </b>" + countries[i].region;
    countryCard.appendChild(countryRegion);

    countryCard.addEventListener("click", () => {
      window.location.href = "details.html" + countryCardHandler(countries[i]);
    });
    // Append each individual country card to the cards container
    countryCardsContainer.appendChild(countryCard);
  }
}

function filterData(
  countryNameInput,
  countryRegionInput,
  countryPopulationInput,
) {
  try {
    console.log("Inside filterData() !"); // For debugging

    // Validate input
    let regex = new RegExp(/^[a-zA-Z -]*$/);
    if (!regex.test(countryNameInput.value)) {
      let populationMaxMessage = "Error: Invalid country name";
      errorMessageArea.textContent = populationMaxMessage;
      showMoreButton.style.display = "none";
      return false;
    }

    errorMessageArea.textContent = "";

    if (
      countryPopulationInput.value > 1500000000 ||
      countryPopulationInput.value < 0
    ) {
      let populationMaxMessage = "Error: The maximum population is 1.5 billion";
      errorMessageArea.textContent = populationMaxMessage;
      return false;
    }

    if (countryRegionInput.value == "All Regions") {
      countries = data.filter((country) => {
        if (
          (country.name.common
            .toLowerCase()
            .includes(countryNameInput.value.toLowerCase()) ||
            country.name.official
              .toLowerCase()
              .includes(countryNameInput.value.toLowerCase())) &&
          country.population >= countryPopulationInput.value
        ) {
          return country;
        }
      });
    } else {
      countries = data.filter((country) => {
        if (
          (country.name.common
            .toLowerCase()
            .includes(countryNameInput.value.toLowerCase()) ||
            country.name.official
              .toLowerCase()
              .includes(countryNameInput.value.toLowerCase())) &&
          country.population >= countryPopulationInput.value &&
          country.region.toLowerCase() == countryRegionInput.value.toLowerCase()
        ) {
          return country;
        }
      });
    }

    if (countries.length > 12) {
      displayCount = 12;
    } else {
      displayCount = countries.length;
    }
    populateCountryCards(countries);
  } catch (error) {
    console.log(error.message);
  }
}

function showMoreHandler() {
  displayCount += 10;

  populateCountryCards(countries);
  /* 
  window.scrollBy({
    top: 670, // scroll down 300px
    left: 0,
    behavior: "smooth", // or "auto"
  });*/
}

// Function to format multiple values within an array to one string
function getFormattedNames(languages) {
  let formattedName = "";
  for (let i = 0; i < languages.length; i++) {
    if (i == languages.length - 1) {
      formattedName += languages[i].name;
      break;
    }
    formattedName += languages[i].name + ", ";
  }
  return formattedName;
}

function countryCardHandler(country) {
  let languages = getFormattedNames(country.languages);

  let currencies = getFormattedNames(country.currencies);
  let queryString =
    "?name=" +
    encodeURIComponent(country.name.official) +
    "&flag=" +
    encodeURIComponent(country.flags.png) +
    "&population=" +
    encodeURIComponent(country.population) +
    "&region=" +
    encodeURIComponent(country.region) +
    "&subregion=" +
    encodeURIComponent(country.subregion) +
    "&capital=" +
    encodeURIComponent(country.capital) +
    "&currencies=" +
    encodeURIComponent(currencies) +
    "&languages=" +
    encodeURIComponent(languages);

  return queryString;
}

// Adding event listeners
document.addEventListener("DOMContentLoaded", populateCountryCards(data)); // Populate country cards on DOM content loading

// Filter data on user input
countryNameInput.addEventListener("input", () => {
  filterData(countryNameInput, regionInput, populationInput);
});

regionInput.addEventListener("input", () => {
  filterData(countryNameInput, regionInput, populationInput);
});

populationInput.addEventListener("input", () => {
  filterData(countryNameInput, regionInput, populationInput);
});

// Show More Button
showMoreButton.addEventListener("click", showMoreHandler);
