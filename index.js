const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const portNo = 3000
const apiRouter = express.Router();
const quotesApi = require("./api/quotes")

console.log("--- This is a Node Express API Demo ---")

// parse application/json
app.use(bodyParser.json())
app.use(express.static("public"))
app.use("/api/v1", apiRouter)
apiRouter.use("/quotes", quotesApi)

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  });
}

apiRouter.get("/time", (req, res) => {
  let now = new Date()
  res.json({
    datetime: now,
    msg: "Have a nice day"
  })
})

// apiRouter.post("/user", (req, res) => {
//   console.log("We got a POST request from client", req.body)
//   // Access DB, update some info, etc...
//   res.json("OK")
// })

// Use the error handler
app.use(errorHandler);

app.listen(portNo, () => {
  console.log(`Listening at port ${portNo}`)
})