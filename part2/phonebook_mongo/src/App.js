import React, { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './phone'
import './index.css'


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = () => {
  
  useEffect(() => {
    axios.get('http://localhost:3001/api/persons')
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

  const [errorMessage, setErrorMessage] = useState(null)

  const [noteErrorMessage, setNoteErrorMessage] = useState(null)


  const namesToShow = 
    persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))
    
  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
        let ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (ok === true) {
          const nameObject = {
            name: newName,
            id: newName,
            number: phoneNumbers
          }
       
          axios.put('http://localhost:3001/api/persons/'+(newName), nameObject)
          .then(response => {
          console.log(response.data)
          axios.get('http://localhost:3001/api/persons')
          .then(response => {
          console.log(response.data)
          setPersons(response.data)
          })
          })
          .catch(error => {
            setNoteErrorMessage(
              `${newName} has already been removed from server`
            )
            setTimeout(() => {
              setNoteErrorMessage(null)
            }, 5000)
          })
        }
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
        setErrorMessage(
          `${newName} added to server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }
  const deletePersonName = (id, name) => {
    let x = window.confirm(`Delete ${name} ?`)
    if (x === true) {
      axios.delete('http://localhost:3001/api/persons/'+(id))
      .then(response => {
      console.log(response.data)
      axios.get('http://localhost:3001/api/persons')
      .then(response => {
      console.log(response.data)
      setPersons(response.data)
      })
      })

    }
    
  }

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const Note = ({message}) => {
    if (message === null) {
      return null
    }
    return (
      <div className="warning">
        {message}
      </div>
    )
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
      <Notification message={errorMessage} />
      <Note message={noteErrorMessage} />
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
          {namesToShow.map(person => <li key={person.id}>{person.name} {person.number} <Button handleClick={() => {deletePersonName(person.id, person.name)}}  text="delete"/></li>)}
          
        </ul>
      
      
      
    </div>
  )
}

export default App