import React, { useEffect, useState } from 'react';
import phonebookService from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons ] = useState([]);
  const [newPerson, setNewPerson] = useState(
    { name: '', number: ''}
  )
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    phonebookService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({ name: '', number: ''});
        setNotification({
          type: 'success',
          message: `Added ${newPerson.name}`
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000)
      })
      .catch((error) => {
        setNotification({
          type: 'error',
          message: error.response.data.error
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000)
      })
  }

  const handleDelete = (personObject) => {
    if (window.confirm(`Delete ${personObject.name}`)) {
      phonebookService
      .remove(personObject.id)
      .then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== personObject.id));
      }).catch((error) => {
        setNotification({
          type: 'error',
          message: `${personObject.name} was already deleted from the server`
        });
        setPersons(persons.filter(person => person.id !== personObject.id));
        setTimeout(() => {
          setNotification(null);
        }, 3000)
      })
    }
  }


  const handlePersonFormChange = (event) => {
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
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handlePersonFormChange={handlePersonFormChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App;
