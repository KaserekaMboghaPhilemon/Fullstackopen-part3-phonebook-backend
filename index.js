const express = require('express')
const app = express()

// This line is essential for my (Exercise 3.5)
//  as it allows the server to parse JSON bodies in incoming requests,
//  which is necessary for handling POST requests that add new persons to the phonebook.
app.use(express.json()) 

// ... (your persons array and other routes) ...

// Exercise 3.5: Handle adding a new person
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Generate a random ID as requested by the exercise
  const generatedId = Math.floor(Math.random() * 10000)

  const person = {
    name: body.name,
    number: body.number,
    id: generatedId,
  }

  // Add the new person to the array
  persons = persons.concat(person)

  // Send back the created person as a response
  response.json(person)
})
// Data for the phonebook, stored in memory for now
let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Philemon Kasereka",
      "number": "",
      "id": 3
    },
    {
      "name": "Happy Mbambu",
      "number": "075-5014877",
      "id": 4
    },
    {
      "name": "Fallon Mumbere",
      "number": "073-9209076",
      "id": 5
    },
    {
      "name": "Fifi Kahindo",
      "number": "073-8119313",
      "id": 6
    },
    {
      "name": "Fabien Kambale",
      "number": "078-3188466",
      "id": 7
    },
    {
      "name": "Fani Kavira Melena",
      "number": "047-5909877 ",
      "id": 8
    },
    {
      "name": "cleave masereka",
      "number": "0779778007",
      "id": 9
    },
    {
      "name": "Samuel Mbambu",
      "number": "0776901380",
      "id": 10
    }
]

// Route to fetch all person objects
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// NEW: Route to show summary info about the phonebook(exercise 3.2)
app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()
  
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

// 
// Fetch a single person by ID (exercise 3.3)
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id) 
  // String IDs were supposed to be Converted at this point,
  //  to Numbers in order to match the type of IDs in the persons array 
  // but was done from step1
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    // If no person is found, send a 404 status code
    response.status(404).end()
  }
})



// Route to delete a person by ID (Exercise 3.4)
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// NEW: Delete route
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  // Status 204 means "No Content" - the best response for a successful delete
  response.status(204).end()
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
