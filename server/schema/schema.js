const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');
// Mongoose Models
const Project = require('../models/Project.js')
const Client = require('../models/Client.js')

// Creating Client Type with GraphQL Object Type

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

// Creating Project Type with GraphQL Object Type

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId)
            }
        }
    })
})

// Create a query by creating a route query object

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find()
            }
        },
        // Query a single project
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Project.findById(args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find()
            }
        },
        // Query a single client
        client: {
            // If we are getting a single client we need to pass in an ID which is the second key value pair.
            // When we make our query on our frontend we will pass the ID we want for this client.
            type: ClientType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Client.find(args.id)
            }
        },
    }
})

// Mutations

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Adding Client
        addClient: {
            // Explicitly stating what we are creating,
            type: ClientType,
            // Arguments are the fields that you want to add.
            args: {
                 // To ensure that the user has to put the name into the field from our server we can wrap the GraphQLString method with the GraphQLNonNull method from the GraphQL library
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // Creating a new client instance
                const client = new Client({
                    // These arguments will come from our form from frontend
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })

                return client.save()
            }
        },
        // Delete a Client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {

                // Finds all projects with clientId matching args.id

                Project.find({clientId: args.id}).then((projects) => {
                    projects.forEach(project => {
                        project.deleteOne()
                    })
                })
                return Client.findByIdAndDelete(args.id);
      },
        },
        // Add
        addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                // We will use the enum 
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                        defaultValue: 'Not Started'
                },
                clientId: { type: GraphQLNonNull(GraphQLID) }
             },
            resolve(parent, args){
                // Create a new project
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })

                // Save that project we have created into the NoSQL MongoDB

                return project.save()
            }
        },
        /* Delete a project */
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                return Project.findByIdAndDelete(args.id)
            }
        },
        /* Update a project */
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        }
                    })
                }
            },
            resolve(parent, args){
                return Project.findByIdAndUpdate(
                    // Getting the ID from the client or form
                    args.id,
                    {
                        // Updating these fields in the MongoDB
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        }
                    },
                    // If there is no project, it will create a new one.
                    { new: true }
                )
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    // If we set the GraphQLObjectType in line 76 to myMutation or another variable name we would have to use the "mutation" as a key in this object
    mutation
})

