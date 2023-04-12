const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(requestLogger)



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Joaco", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) =>{
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.get('/info', (req, res) =>{
    res.send(`Phonebook has info for ${persons.length} people <br/> ${new Date()}`)
})

app.post('/api/persons', (req, res)=>{
    const body = req.body
    if (!body.number || !body.name || persons.some(per => per.name === body.name)){
        return res.status(400).json({
            error: 'content missing'
        })
    }
    
    const newID = Math.floor(Math.random() * 1000000)
    const newEntry = {id: newID, name:body.name, number: body.number}
    persons = persons.concat(newEntry)
    res.json(newEntry)
})



app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})