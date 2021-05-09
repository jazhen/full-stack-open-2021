const PersonForm = ({ addPerson, newPerson, handlePersonFormChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          name='name'
          value={newPerson.name}
          onChange={handlePersonFormChange}
        />
      </div>
      <div>
        number:
        <input
          name='number'
          value={newPerson.number}
          onChange={handlePersonFormChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
