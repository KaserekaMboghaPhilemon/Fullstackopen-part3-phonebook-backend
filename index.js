const express = require('express')
const morgan = require('morgan')
const cors = require('cors') // 1. Import cors
const app = express()

app.use(cors()) // 2. Enable CORS for all routes

app.use(express.json()) 


// Exercise 3.8: Creating a custom token to display the POST body
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

// Use a custom format string that includes our new :body token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// ... (rest of my persons array and routes)


// Data for the phonebook, stored in memory (Exercise 3.1)
let persons = [
    { "name": "Arto Hellas", "number": "040-123456", "id": 1 },
    { "name": "Ada Lovelace", "number": "39-44-5323523", "id": 2 },
    { "name": "Philemon Kasereka", "number": "070-000000", "id": 3 },
    { "name": "Happy Mbambu", "number": "075-5014877", "id": 4 },
    { "name": "Fallon Mumbere", "number": "073-9209076", "id": 5 },
    { "name": "Fifi Kahindo", "number": "073-8119313", "id": 6 },
    { "name": "Fabien Kambale", "number": "078-3188466", "id": 7 },
    { "name": "Fani Kavira Melena", "number": "047-5909877 ", "id": 8 },
    { "name": "cleave masereka", "number": "0779778007", "id": 9 },
    { "name": "Samuel Mbambu", "number": "0776901380", "id": 10 }
]

// --- ROUTES ---

// Exercise 3.1: Route to fetch all person objects
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Exercise 3.2: Route to show summary info about the phonebook
app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

// Exercise 3.3: Fetch a single person by ID
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    // If no person is found, send a 404 status code
    response.status(404).end()
  }
})

// Exercise 3.4: Route to delete a person by ID
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  // Status 204 means "No Content" - the standard response for successful deletion
  response.status(204).end()
})

// Exercise 3.5 & 3.6: Handle adding a new person with validation logic
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Exercise 3.6: Validation 1 - Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  // Exercise 3.6: Validation 2 - Check if the name already exists in the phonebook
  const nameExists = persons.find(p => p.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  // Exercise 3.5: Create the person object with a generated random ID
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000),
  }

  persons = persons.concat(person)
  response.json(person)
})

// Exercise 3.10: prepare for deployment,
//  by using environment variable for the port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
