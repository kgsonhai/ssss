const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const cors = require('cors')

// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods
const mongoDataMethods = require('./data/db')
const db = require('./config/db');


// Connect to MongoDB
// const connectDB = async () => {
// 	try {
// 		await mongoose.connect('mongodb://localhost:27017/graphQL_demo', {
// 			useCreateIndex: true,
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 			useFindAndModify: false
// 		})

// 		console.log('MongoDB connected')
// 	} catch (error) {
// 		console.log(error.message)
// 		process.exit(1)
// 	}
// }
db.connect();


const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({ mongoDataMethods })
})

const app = express()
app.use(cors())
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)
