const express = require('express');
const colors = require('colors')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql')
const schema = require("./schema/schema")
const connectDB = require('../server/config/db.js')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigin = ['http://localhost:3000/project-mgmt-app', 'https://mambawebdev.github.io/project-mgmt-app/']

connectDB()


app.use(cors({
  origin: allowedOrigin,
}))

app.get('/', (req, res) => {
  res.send('GraphQL API is running! Visit /graphql');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development"
}))


app.listen(port, () => {
    console.log(`Server running on PORT: ${port} `)
})