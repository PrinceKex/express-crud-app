const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { sequelize } = require('./models')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/user.routes'))

const PORT = process.env.PORT || 3000

async function startServer() {
 try {
  await sequelize.authenticate()
  console.log('Database connection has been established successfully.')
  await sequelize.sync()
  console.log('Database synchronized')

  app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
  })
 } catch (error) {
  console.error('Unable to connect to the database:', error)
 }
}

startServer()
