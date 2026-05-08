const express = require('express')
const morgan = require('morgan')
const cors = require('cors') 
const app = express()

// --- MIDDLEWARE ---

// Allows the frontend (on a different port/domain)
//  to talk to this backend
app.use(cors()) 

// Automatically parses incoming JSON data from
//  requests so we can use req.body
app.use(express.json()) 

// Tells Express to serve the static files
//  (HTML/CSS/JS) from the 'dist' folder
// This is how the backend displays your React frontend
app.use(express.static('dist'))

// Exercise 3.8: Custom Morgan token to extract the
//  JSON body from POST requests
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

// Logs network requests to the terminal 
// (Method, URL, Status, Response Time, and the Body)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// --- DATA ---

// Hardcoded data used as my temporary "database" in memory
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

// GET: Returns the full list of people in JSON format
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// GET: Returns a simple HTML summary of the phonebook status
app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

// GET: Returns a specific person by searching
//  for their unique IDs
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    // Sends a 404 error if the person doesn't exist
    response.status(404).end()
  }
})

// DELETE: Removes a person from the array based on their ID
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  // 204 No Content confirms success without sending data back
  response.status(204).end()
})

// POST: Adds a new person to the phonebook with validation
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Validation: Ensure both name and number are provided
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  // Validation: Ensure the name is not already in the list
  const nameExists = persons.find(p => p.name === body.name)
  if (nameExists) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000), // Generates a random ID
  }

  persons = persons.concat(person)
  response.json(person)
})

// --- SERVER START ---

// Uses Render's dynamic port (process.env.PORT)
//  or 3001 for local testing
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})