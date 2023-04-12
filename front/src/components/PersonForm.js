const PersonForm = ({addPersonHandler, changeNameHandler, changePhoneHandler}) =>{
    return(
        <>
            <form onSubmit={addPersonHandler}>
                <div>
                    name: <input onChange={changeNameHandler} />
                </div>
                <div>
                    Phone: <input onChange={changePhoneHandler} />
                </div>
                <button type="submit">add</button>
            </form>
        </>
    )
}
export default PersonForm