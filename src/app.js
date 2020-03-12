import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'
import mongoose from 'mongoose'
import configs from './configs/configs'
import logger from './utils/logger'
import morgan from 'morgan'
const app = express()

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
  }
// Connect MongoDB
mongoose.connect(configs.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true 
})
const db = mongoose.connection
db.on('open', () => {
  logger.info('DB connected')
})
db.on('error', (err) => logger.error(err))

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(configs.PORT, () => {
    console.log('now listening for requests on port 4000');
});


