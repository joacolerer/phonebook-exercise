import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/personService";
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null)


  const addPerson = (event) => {
    event.preventDefault();
    if (!persons.find((person) => person.name === newName)) {
      const newPerson = { name: newName, number: newPhone }
      personService
      .create(newPerson)
      .then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const oldPerson = persons.find((person) => person.name === newName)
        const updatedPerson = {name: newName, number: newPhone}
        personService
        .update( oldPerson.id,updatedPerson)
        .then(() => {
          setPersons(persons.map(p => p.name !== newName ? p : updatedPerson))
          setMessage(`Changed number from ${updatedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
        .catch((error) => {
          setMessage(`Added ${error.message}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
      }
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const deleteHandler = (person) =>{
    if (window.confirm(`Delete ${person.name}`)) {
      personService
      .deletePerson(person.id)
      .then(() => {
          setPersons(persons.filter(p => p.name !== person.name))
      })
    }
  }
  
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() =>{
    personService
    .getAll()
    .then(persons =>{
      setPersons(persons)
    })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilter}></Filter>
      <h3>Add a new person</h3>
      <PersonForm addPersonHandler = {addPerson} changeNameHandler = {handleNewName} changePhoneHandler = {handleNewPhone}/>
      <ul>
        {filteredPersons.map((person) => (
            <Person key={person.name} person = {person} deleteHandler = {() => deleteHandler(person)}/>
        ))}
      </ul>
      <Notification message={message}/>
    </div>
  );
};

export default App;
