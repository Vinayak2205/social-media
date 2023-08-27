const mongoose = require("mongoose");
const { Schema } = mongoose;

const Posts = new Schema({
  author: [{ type: Schema.ObjectId, ref: "User" }],
  content: {
    type: String,
    trim: true,
  },
  media: [
    {
      type: String,
    },
  ],
});
