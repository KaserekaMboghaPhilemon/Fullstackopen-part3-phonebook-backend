/**
 * Full Stack Open - Part 3c: MongoDB
 * Exercise 3.12: Command-line database
 */

const mongoose = require('mongoose')

// VALIDATION: Checks if the password was passed in the terminal (node mango.js <password>)
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// CONNECTION: Your specific Atlas URI. 'phonebookApp' is the target database name.
const url = `mongodb+srv://Philemon-Kasereka:133246557@cluster0.kuyxamk.mongodb.net/phonebookApp?retryWrites=true&w=majority`

// CONFIGURATION: Disables strict mode for queries to ensure Mongoose 7+ compatibility.
mongoose.set('strictQuery', false)

// INITIALIZATION: Establishes the link between your Node app and the MongoDB cluster.
mongoose.connect(url)

// SCHEMA: The blueprint defining the structure (name and number) for each entry.
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// MODEL: The interface for the 'people' collection, built using the personSchema.
const Person = mongoose.model('Person', personSchema)

// INSTANCE: A specific data object created in memory, following the Person model.
const person = new Person({
  name: 'Philemon Kasereka',
  number: '070-123456',
})


// PERSISTENCE: Sends the object to the cloud. .save() returns a Promise.
person.save().then(result => {
  // CONFIRMATION: Logs the result once the database acknowledges the save.
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  
  // TERMINATION: Closes the database connection to allow the script to exit.
  mongoose.connection.close()
})