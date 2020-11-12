const express = require("express")
const router = express.Router()

// This is an in memory database (for demo purposes)
let allQuotes = [
  { id: "id1", text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { id: "id2", text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { id: "id3", text: "Anyone who considers arithmetical methods of producing random digits is, of course, in a state of sin.", author: "John von Neumann" },
  { id: "id4", text: "Program testing can be used to show the presence of bugs, but never to show their absence!", author: "Edsger W. Dijkstra" },
  {
    id: "id5",
    text: "I was born not knowing and have had only a little time to change that here and there.",
    author: "Richard Feynman"
  }
]

const createRandomId = (maxChars = 12) => {
  let id = "id"
  for (let i = 0; i < maxChars; i++) {
    id += Math.floor(10 * Math.random())
  }
  return id
}

router.get("/", (req, res, next) => {
  res.json(allQuotes)
})

router.get("/:id", (req, res, next) => {
  let { id } = req.params
  console.log("id", id)
  let quote = allQuotes.find(q => q.id == id)

  try {
    if (quote) {
      res.json(quote)
    }
    else {
      res.status(404)
      res.json({
        id,
        msg: "Resource cannot be found!"
      })
    }
  } catch (error) {
    next(error)
  }
})

// Will create a new quote
router.post("/", (req, res, next) => {
  try {
    let id = createRandomId()
    let quote = {
      id,
      ...req.body
    }
    console.log("New quote created", quote)
    allQuotes.push(quote)
    res.json(quote)
  } catch (error) {
    res.status(404)
    res.json("Error")
  }
})

// This update the corresponding quote in our
// in memory database!
router.put("/:id", (req, res, next) => {
  try {
    let { id } = req.params
    let foundItem = allQuotes.find(q => q.id === id)
    if (foundItem) {
      let { text, author } = req.body

      foundItem.text = text
      foundItem.author = author

      res.json(foundItem)
    }
    else {
      res.status(404)
      res.json("Update error!")
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", (req, res, next) => {
  try {
    let { id } = req.params
    let foundItem = allQuotes.find(q => q.id === id)
    if (foundItem) {
      allQuotes = allQuotes.filter(q => q.id !== id)
      res.json({
        id,
        msg: "Deleted"
      })
    }
    else {
      res.status(404)
      res.json({
        id,
        msg: "Resource cannot be found!"
      })
    }
  } catch (error) {
    next(error)
  }
})


module.exports = router