const Persons = ({ persons, filter, handleDelete }) => {
  const nameIncludesFilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase());

  return (
    <ul>
      {persons
        .filter((person) => nameIncludesFilter(person))
        .map((person) =>
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person)}>delete</button>
          </li>
      )}
    </ul>
  )
}

export default Persons;
