import config from './utils/config.js'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import middleware from './utils/middleware.js'
import logger from './utils/logger.js'
import mongoose from 'mongoose'
import blogRouter from './controllers/blog_controller.js'
import usersRouter from './controllers/user_controller.js'
import loginRouter from './controllers/login_controller.js'
import commentRouter from './controllers/comment_controller.js'

const app = express()
mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blog', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/comments', commentRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

console.log('Finished setting up routes')

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
