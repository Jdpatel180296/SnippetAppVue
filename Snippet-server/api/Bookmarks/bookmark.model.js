const mongoose = require("mongoose");

const bookmark_schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    snippet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippets",
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Bookmark = mongoose.model("Bookmark", bookmark_schema);
module.exports = Bookmark;
