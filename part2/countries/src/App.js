import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Weather = ({capital}) => {
  const [weather, setWeather] = useState({})
  const getWeather = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const capitalCity = capital.toString()
    console.log('http://api.weatherstack.com/current?access_key='+api_key+'&query'+capitalCity)
    axios.get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+capitalCity
    )
    .then(response => {
    setWeather(response.data)
  })
  }
 

  useEffect((getWeather), [])
  
  if(Object.keys(weather).length !== 0) {
    return (
      <div>
        <div>
          temperature: {weather.current.temperature}
        </div>
        <img alt="weather icon" src={weather.current.weather_icons} />
        <div>
          wind: {weather.current.wind_speed}
        </div>
      </div>
    )
  }
  else {
    return (<div></div>)
  }
}

const App = () => {
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
    console.log(response.data)
    setCountries(response.data)
    })
  }, [])
  
  const [countries, setCountries] = useState([])
    
  const [showAll, setShowAll] = useState('')

  const [styleChange, setStyleChange] = useState(false)
    
  const countriesToShow = 
      countries.filter(country => country.name.toLowerCase().includes(showAll.toLowerCase()))
  
  
      
  const handleCountryChange = (event) => {
    setShowAll(event.target.value)
    }
  const setVis = () => {
    setStyleChange(true)
  }

  if (countriesToShow.length > 10) {
      return (
        <div>
        find countries <input
        value = {showAll}
        onChange={handleCountryChange}/>

        <p>Too many matches, specify another filter</p>
        </div>
      )
  }

  else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
    return (
      <div>
        find countries <input
        value = {showAll}
        onChange={handleCountryChange}/>

         {countriesToShow.map(country => (
            <div key={country.population}>
              <div key={country.area} style={{display: styleChange ? "none" : "block"}}>
                {country.name} <Button handleClick={setVis} text="show" />
              </div>
            </div>
            )
          )
         }
      </div> 
    )
  }
  else  { 
    return (  
      <div>
        find countries <input
        value = {showAll}
        onChange={handleCountryChange}/>
      
        {countriesToShow.map(country => (
          <div key={country.population}>
            <div key={country.area} style={{display: styleChange ? "none" : "block"}}>
              {country.name} <Button handleClick={setVis} text="show" />
            </div>
              <div key={country.alpha3Code} style={{display: styleChange ? "block" : "none"}}> 
              <h2 key={country.name}>{country.name}</h2>
              <br />
              <div>
                capital {country.capital}
                <br />
                population {country.population}
              </div>
              <h3>
                languages
              </h3>
              <ul>
                {country.languages.map(lang => 
                <li key={lang.name}>{lang.name}</li>
                )}
              </ul>
              <img key={country.alpha2Code} src={country.flag} alt="Country Flag" width="200" height="100"/>
              <h1>Weather in {country.capital}</h1>
              <Weather capital={country.capital} />
              </div>
            </div>
          )
        )}
      </div>
    )  
  }
}

export default App