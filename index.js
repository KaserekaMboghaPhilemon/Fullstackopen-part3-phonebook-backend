require('dotenv').config() // LAZIMA THIS MUST BE FIRST
const express = require('express')
const morgan = require('morgan')
const cors = require('cors') 
const app = express()
const Person = require('./models/person') // Import database module

// --- MIDDLEWARE ---
app.use(cors()) 
app.use(express.json()) 
app.use(express.static('dist'))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// --- ROUTES ---

// Exercise 3.13: Retrieve all phone information from the database
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Exercise 3.13: Summary info using data from the database
app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    const date = new Date()
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date}</p>
    `)
  })
})

// Updated single fetch to use MongoDB ID
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

// KEEPING POST/DELETE AS IS UNTIL 3.14 FOR THIS COMMIT
app.delete('/api/persons/:id', (request, response) => {
  // Logic will be updated in 3.15
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  // Logic will be updated in 3.14
  response.status(201).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})