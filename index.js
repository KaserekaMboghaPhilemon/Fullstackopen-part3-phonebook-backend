const express = require('express')
const app = express()

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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
