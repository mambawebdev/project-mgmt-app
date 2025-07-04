const express = require('express');
const colors = require('colors')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql')
const schema = require("./schema/schema")
const connectDB = require('../server/config/db.js')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = ['https://mambawebdev.github.io']

connectDB()

app.use(cors())
app.use(cors({
   origin: allowedOrigins,
   credentials: true
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