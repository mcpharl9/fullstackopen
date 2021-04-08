import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
    console.log(response.data)
    setPersons(response.data)
    })
   
  }, [])
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [phoneNumbers, setPhoneNumbers] = useState('')

  const [showAll, setShowAll] = useState('')

  const namesToShow = 
    persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))
    


  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      return (
        window.alert(`${newName} is already added to phonebook`)
      )
    }
    else {
      const nameObject = {
        name: newName,
        id: newName,
        number: phoneNumbers
      }
      
      // setPersons(persons.concat(nameObject))
      setPhoneNumbers(persons.concat(nameObject))
      setNewName('')
      setPhoneNumbers('')
    }
  }
  
  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberAdd = (event) => {
    setPhoneNumbers(event.target.value)
  }
  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input
          value={showAll}
          onChange={handleFilter} />
          
        </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameAdd}
            />
        </div>
        <div>
          number: <input
          value={phoneNumbers}
          onChange={handleNumberAdd}
          /> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <ul>
        {namesToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
        
      </ul>
      
    </div>
  )
}

export default App