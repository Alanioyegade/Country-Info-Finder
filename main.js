document.getElementById('fetchData').addEventListener('click', async () => {
  const query = document.getElementById('query').value;
  const output = document.getElementById('output');

  output.innerHTML = 'Loading...';

  // Split the query by commas and remove any leading/trailing spaces
  const countries = query.split(',').map(country => country.trim());

  try {
    const results = [];

    // Loop through each country and fetch data
    for (const countryName of countries) {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      
      if (!response.ok) {
        throw new Error(`Country not found: ${countryName}`);
      }

      const data = await response.json();
      const country = data[0];

      // Prepare country information
      results.push(`
        <div>
          <h3>${country.name.common}</h3>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
          <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
          <p><strong>Area:</strong> ${country.area ? country.area.toLocaleString() : 'N/A'} km²</p>
          <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        </div>
      `);
    }

    // Display all the country information
    output.innerHTML = results.join('<hr>'); // Separate results with a horizontal line
  } catch (error) {
    loadingSpinner.style.display = 'none';
    output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});

