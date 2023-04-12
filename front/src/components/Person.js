const Person = ({person, deleteHandler}) => {
    return(
    <ul>
        <li>
            {person.name} - {person.number}
            <button  onClick={() => deleteHandler(person)}>Delete</button>
        </li>
    </ul>
    )
}
export default Person