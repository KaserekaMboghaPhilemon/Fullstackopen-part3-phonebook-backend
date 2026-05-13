app.post('/api/persons', (request, response) => {
  const body = request.body

  // Validation remains important
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  // Create a new instance of the Person model
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  // Save the instance to MongoDB
  person.save().then(savedPerson => {
    // Respond with the newly saved person
    //  (which now includes a MongoDB id)
    response.json(savedPerson)
  })
})

// testing this, open react app and use the form to add a new 
// name and number then refrsh the page,
// the added person must remain in the list, this is because 
// the data is now stored in the database and not in memory.