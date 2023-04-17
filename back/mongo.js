const mongoose = require('mongoose')

const password = process.argv[2]
const url =
    `mongodb+srv://joacolerer:${password}@db.tjzuvny.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
    id:Number,
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length>3) {
    const name = process.argv[3]
    const phone = process.argv[4]
    
    const person = new Person({
        id:44,
        name: name,
        number: phone,
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} else{
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
          console.log(`${person.name} - ${person.number}`)
        })
        mongoose.connection.close()
    })
}





