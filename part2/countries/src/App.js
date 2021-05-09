import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({ countries }) => {
  const [shown, setShown] = useState(new Array(countries.length).fill(false));

  const toggleShow = (index) => {
    setShown(shown.slice(0, index).concat(!shown[index], shown.slice(index + 1)))
  }

  return (
    <ul>
      {countries.map((country, index) =>
        <li key={country.alpha3Code}>
          {country.name}
          {
            shown[index]
              ? <Country country={country} />
              : <button onClick={() => toggleShow(index)}>show</button>
          }
        </li>
      )}
    </ul>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState({
    temperature: '',
    windSpeed: '',
    windDirection: '',
    icon: ''
  });

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }

    axios
      .get(`http://api.weatherstack.com/current`, {params})
      .then((response) => {
        const apiResponse = response.data;

        setWeather({
          ...weather,
          temperature: apiResponse.current.temperature,
          windSpeed: apiResponse.current.wind_speed,
          windDirection: apiResponse.current.wind_dir,
          icon: apiResponse.current.weather_icons[0],
        });
      }).catch(error => {
        console.log(error);
      });
  }, [weather, country.capital])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img
        src={`https://restcountries.eu/data/${country.alpha3Code.toLowerCase()}.svg`}
        alt='flag'
      />
      <h3>Weather in {country.capital}</h3>
      <p>
        <strong>temperature: </strong>
        <span>{weather.temperature} ℃</span>
      </p>
      <img
        src={weather.icon}
        alt='weather'
      />
      <p>
        <strong>wind: </strong>
        <span>{weather.windSpeed} mph direction {weather.windDirection}</span>
      </p>
    </div>
  )
}

const Display = ({ countries, filter }) => {
  const containsSearchTerm = (country) => country.name.toLowerCase().includes(filter.toLowerCase());
  const filteredCountries = countries.filter((country) => containsSearchTerm(country));

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];

    return <Country country={country} />
  } else if (filteredCountries.length <= 10) {
    return <Countries countries={filteredCountries} />
  } else {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data);
      })
  }, [])

  const handleSearchTermChange = (event) => setFilter(event.target.value);

  return (
    <div>
      find countries
      <input
        value={filter}
        onChange={handleSearchTermChange}
      />
      {
        filter.length > 0
          ? <Display countries={countries} filter={filter} />
          : null
      }
    </div>
  );
}

export default App;
