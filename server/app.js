if(process.env.NODE_ENV == "development") {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes')
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.listen(port, () => {
  console.log(`Fancy-Todo App listening at http://localhost:${port}/`)
})