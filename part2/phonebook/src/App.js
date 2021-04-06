import React, { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './phone'


const App = () => {
  
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
    console.log(response.data)
    setPersons(response.data)
    })
   
  }, [])

  useEffect(() => {
    phoneService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [phoneNumbers, setPhoneNumbers] = useState('')

  const [showAll, setShowAll] = useState('')

  const [deleteName, setDeleteName] = useState('')

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
      
      setPersons(persons.concat(nameObject))
      setPhoneNumbers(persons.concat(nameObject))
      setNewName('')
      setPhoneNumbers('')
    
    phoneService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
      })
    }
  }
  const deletePersonName = (event) => {
    event.preventDefault()
    if 
        window.confirm('Delete {person.name}?')
      )
    }
  }

  const handleNameDelete = (event) => {
    setDeleteName(event.target.value)
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
      <form onSubmit={deletePersonName}>
        <input value={persons.name}
        onChange={handleNameDelete} />
        <ul>
          {namesToShow.map(person => <li key={person.id}>{person.name} {person.number} <button type="submit">delete</button></li>)}
          
        </ul>
      </form>
      
      
    </div>
  )
}

export default App