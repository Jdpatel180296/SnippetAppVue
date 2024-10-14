const mongoose = require("mongoose");

const snippet_schema = new mongoose.Schema(
  {
    title: String,
    code_snippet: String,
    programming_language: String,
    created: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

snippet_schema.post("findOneAndDelete", async function (snippet) {
  const Bookmark = mongoose.model("Bookmark");
  try {
    const deletedookmarks = await Bookmark.deleteMany(
      { snippet_id: snippet._id },
      { $pull: { snippet_id: snippet._id } }
    );

    if (deletedookmarks.deletedCount > 0) {
      console.log("Successfully deleted snippet from bookmarks");
    }
  } catch (error) {
    console.log("No snippet to remove from Bookmark");
  }
});

snippet_schema.virtual("bookmarks", {
  ref: "Bookmark",
  localField: "_id",
  foreignField: "snippet_id",
});

const Snippet = mongoose.model("Snippet", snippet_schema);
module.exports = Snippet;
