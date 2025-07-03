const mongoose = require('mongoose')


// Creating mongoose Schema

const ProjectSchema = new mongoose.Schema({
    name: { type: String,},
    description: { type: String,},
    status: { type: String, enum: ["Not Started", "In Progress", "Completed"]},
    // When we create a new record in a collection (MongoDB) it will always be signed a specific ID (_id) that we see in many of our projects that is called an ObjectID, it's created automatically and never defined specifically in our codebase, Basically we want this to be an ObjectID but to relate to the Client Model using the ref jkey property.
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
})

module.exports = mongoose.model('Project', ProjectSchema)