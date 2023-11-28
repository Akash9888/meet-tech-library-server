const mongoose = require("mongoose");
const { Schema } = mongoose;
const BookSchema = new Schema({
  bookName: {
    type: "string",
    required: true,
  },
  author: {
    type: "string",
    required: true,
  },
  genre: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  price: {
    type: "number",
    required: true,
  },
  quantity: {
    type: "number",
    required: true,
  },

  publishDate: {
    type: "string",
    required: true,
  },
  photo: {
    type: "string",
    required: true,
  },
});
const book = mongoose.model("Book", BookSchema);
module.exports = book;
