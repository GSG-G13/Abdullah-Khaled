const searchForm = document.querySelector('#search-form');
const resultsDiv = document.querySelector('#results');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const depIata = searchForm.elements.dep_iata_code.value;
  const arrIata = searchForm.elements.arr_iata_code.value;
  const flightDate = searchForm.elements.flight_date.value;
  const searchQuery = searchForm.elements.search.value; // added search term
  console.log(depIata)
  console.log(arrIata)
  // Create the API request URL with search parameter
  let url = `/search?dep_iata=${depIata}&arr_iata=${arrIata}&flight_date=${flightDate}`;
  if (searchQuery) {
    url += `&search=${searchQuery}`;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Create a div to display the flight results
      const flightList = document.createElement('div');

      // Add each flight to the list
      data.forEach(flight => {
        const flightDiv = document.createElement('div');
        const flightHeader = document.createElement('h2');
        const departureP = document.createElement('p');
        const arrivalP = document.createElement('p');
        flightHeader.textContent = `${flight.airline.name} Flight ${flight.flight.number}`;
        departureP.textContent = `Departure: ${flight.departure.airport} (${flight.departure.scheduled})`;
        arrivalP.textContent = `Arrival: ${flight.arrival.airport} (${flight.arrival.scheduled})`;
        flightDiv.appendChild(flightHeader);
        flightDiv.appendChild(departureP);
        flightDiv.appendChild(arrivalP);
        flightDiv.classList.add("flight-div")
        flightList.appendChild(flightDiv);
      });

      // Display the list in the results div
      resultsDiv.innerHTML = '';
      resultsDiv.appendChild(flightList);
    })
    .catch(error => {
      console.error(error);
      resultsDiv.textContent = 'An error occurred. Please try again later.';
    });
});
