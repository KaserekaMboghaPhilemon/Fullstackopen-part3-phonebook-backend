const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
