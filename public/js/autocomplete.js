// Load the cities array from the cities.json file
fetch('/cities.json')
  .then(response => response.json())
  .then(cities => {
    // Create an array of city names and a mapping of city names to IATA codes for autocomplete
    const cityNames = cities.map(city => city.name);
    const cityIataMap = cities.reduce((map, city) => {
      map[city.name] = city.iata_code;
      return map;
    }, {});

    // Initialize the autocomplete for the departure and arrival input fields
    const depInput = document.querySelector('#dep-iata');
    const arrInput = document.querySelector('#arr-iata');
    initializeAutocomplete(depInput, cityNames, cityIataMap, cities);
    initializeAutocomplete(arrInput, cityNames, cityIataMap, cities);
  })
  .catch(error => {
    console.error(error);
  });


// Function to initialize the autocomplete for an input field
function initializeAutocomplete(input, cityNames, cityIataMap, cities) {
  // Create a list to display the autocomplete options
  const list = document.createElement('ul');
  list.classList.add('autocomplete-options');

  // Create a hidden input element to store the IATA code
  const hiddenInput = document.getElementById(`${input.name}_code`);

  // Listen for input changes in the input field
  input.addEventListener('input', event => {
    const searchTerm = event.target.value.trim().toLowerCase();

    // Clear the list of autocomplete options
    list.innerHTML = '';

    // Generate a list of matching city names
    const matchingOptions = cityNames.filter(option => {
      return option.toLowerCase().startsWith(searchTerm);
    });

    // Add the matching options to the list
    matchingOptions.forEach(option => {
      const item = document.createElement('li');
      item.textContent = option;
      item.addEventListener('click', () => {
        // Find the city object that matches the selected option
        const selectedCity = cities.find(city => city.name === option);

        // Set the value of the input element to the selected city name
        input.value = selectedCity.name;

        // Set the value of the hidden input element to the selected city IATA code
        const iataCode = cityIataMap[selectedCity.name];
        hiddenInput.value = iataCode;

        // Clear the list of autocomplete options
        list.innerHTML = '';
      });
      list.appendChild(item);
    });

    // Display the list of autocomplete options
    input.parentNode.appendChild(list);
  });

  // Hide the list of autocomplete options when the input field loses focus
  input.addEventListener('blur', event => {
    setTimeout(() => {
      list.innerHTML = '';
    }, 100);
  });
}
