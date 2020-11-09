const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const portNo = 3000

console.log("--- This is a Node Express Demo ---")

// parse application/json
app.use(bodyParser.json())

app.use(express.static("public"));

app.get("/time", (req, res) => {
  let now = new Date()
  res.json({
    datetime: now,
    msg: "Have a nice day"
  })
})

app.post("/user", (req, res) => {
  console.log("We got a POST request from client", req.body)
  // Access DB, update some info, etc...
  res.json("OK")
})

app.listen(portNo)