const mongoose = require("mongoose");

const user_Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      caseSensitive: false,
      lowercase: true,
      required: true,
    },
    password: { type: String, required: true },
    years_experience: Number,
    programming_languages: [String],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

user_Schema.pre("updateOne", async function (next) {
  const { _id } = this.getQuery();

  const { username } = this._update;

  if (username) {
    try {
      const user = await User.findOne({ username });
      if (user && user._id.toString != _id) {
        const err = new Error(`Username ${username} is already taken`);
        return next(err);
      }
    } catch (error) {
      return next(err);
    }
  }
  next();
});
user_Schema.pre("save", async function (next) {
  const { username } = this;

  if (username) {
    try {
      const user = await User.findOne({ username });
      if (user) {
        const err = new Error(
          `Go for new Username!! because Username ${username} is already taken`
        );
        return next(err);
      }
    } catch (error) {
      return next(err);
    }
  }
});

user_Schema.virtual("bookmarks", {
  ref: "Bookmark",
  localField: "_id",
  foreignField: "user_id",
});
user_Schema.virtual("snippets", {
  ref: "Snippet",
  localField: "_id",
  foreignField: "user_id",
});

const User = mongoose.model("Users", user_Schema);
module.exports = User;
