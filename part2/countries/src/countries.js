import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
        console.log(response.data)
        setPersons(response.data)
        })
       
      }, [])
    
    const [countries, setCountries] = useState([])
    
    
      return (
        <div>
            find countries<input/>
        </div>
    )
}
export default App