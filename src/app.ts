import express from 'express'

//* Create a new express application instance
const app = express()

//* Default port
const port = 8090

app.listen(8090, () => {
  console.log(`Server is running on port ${port}`)
})
