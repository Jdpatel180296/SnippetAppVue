const Bookmark = require("./bookmark.model");
const mongoose = require("mongoose");

const createBookmark = async (req, res) => {
  const { body } = req;

  try {
    const bookmark = new Bookmark(body);
    const saved_bookmark = await bookmark.save();
    res.status(201).json(saved_bookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBookmark = async (req, res) => {
  const { params } = req;
  const id = params.id;

  try {
    const deletedBookmark = await Bookmark.findOneAndDelete({ _id: id });
    if (deletedBookmark) {
      console.log("Bookmark deleted successfully");
      res.json({ message: "success", bookmark: deleteBookmark._id });
    } else {
      res.status(404).json({ error: `bookmark with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  createBookmark,
  deleteBookmark,
};
