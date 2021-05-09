import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter show with
      <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({ addPerson, newPerson, handlePersonChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          name='name'
          value={newPerson.name}
          onChange={handlePersonChange}
        />
      </div>
      <div>
        number:
        <input
          name='number'
          value={newPerson.number}
          onChange={handlePersonChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {
  const nameIncludesFilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase());

  return (
    <ul>
      {persons
        .filter((person) => nameIncludesFilter(person))
        .map((person) =>
          <li key={person.name}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons ] = useState([]);
  const [newPerson, setNewPerson] = useState(
    { name: '', number: ''}
  )
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fulfilled');
        setPersons(response.data);
      })
  }, [])
  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newPerson.name);

    if (nameExists) {
      window.alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewPerson({ name: '', number: ''});
    }
  }

  const handlePersonChange = (event) => {
    setNewPerson(({
      ...newPerson,
      [event.target.name]: event.target.value }
    ));
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handlePersonChange={handlePersonChange}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App
