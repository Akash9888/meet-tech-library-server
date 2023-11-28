const express = require("express");
const router = express.Router();
const book = require("../models/book");

const { body, validationResult } = require("express-validator");
const ObjectId = require("mongodb").ObjectId;
router.get("/", async (req, res) => {
  try {
    const books = await book.find();
    res.json(books);
    console.log(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occurred");
  }
});

router.post(
  "/add-product",
  [
    body("bookName", "Please enter a book name").isString(),
    body("author", "Please enter Author name").isString(),
    body("genre", "Please enter proper genre").isString(),
    body("description", "Enter a valid description which length is minimum 5")
      .isLength({ min: 5 })
      .isString(),
    body("price", "Please enter book price").isInt(),
    body("quantity", "Please enter book quantity").isInt(),
    body("publishDate", "Please book publish date").isString(),
    body("photo", "Please enter valid photo url").isURL(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const singleBook = new book(req.body);

    try {
      await singleBook.save();
      res.send(singleBook);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
);

router.get("/book/:_id", async (req, res) => {
  const query = { _id: new ObjectId(req.params._id) };

  const singleBook = await book.find(query);
  try {
    res.send(singleBook);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.put("/book/update/:_id", async (req, res) => {
  const query = { _id: new ObjectId(req.params._id) };

  try {
    const updatedBook = await book.findOneAndUpdate(query, req.body, {
      upsert: true,
    });
    if (updatedBook) {
      return res.send("Successfully updated data.");
    } else {
      return res.status(404).send("No book found to update.");
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.delete("/book/delete/:_id", async (req, res) => {
  const query = { _id: new ObjectId(req.params._id) };
  try {
    const deleteBook = await book.findOneAndDelete(query);
    if (deleteBook) {
      return res.send("Successfully deleted book.");
    } else {
      return res.status(404).send("No book found to delete.");
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
