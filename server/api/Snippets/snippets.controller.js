const Snippet = require("./snippets.model.js");
const util = require("../util/index.js");

const postSnippet = async (req, res) => {
  const { body } = req;
  try {
    delete body.created;

    const snippet_id = new Snippet(body);
    const saved_snippet = await snippet_id.save();

    res.json(saved_snippet);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getSnippets = async (req, res) => {
  const { query } = req;
  const language = query.language;

  let filter = {};
  if (language) {
    filter = {
      programming_language: { $regex: `\\b${language}\\b`, $options: "i" },
    };
  }
  let snippets = null;

  try {
    if (filter) {
      snippets = await Snippet.find(filter);
    } else {
      snippets = await Snippet.find();
    }

    if (snippets) {
      res.json(snippets);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getSnippetbyId = async (req, res) => {
  const { params, query } = req;
  const id = params.id;
  const bookmark = util.queryToBoolean(query.bookmark);

  let snippets = null;
  try {
    if (bookmark) {
      const associatedBookmark = await Snippet.findOne({ _id: id }).populate(
        "bookmarks"
      );
      const bookmarkCount = associatedBookmark.bookmarks.length;

      snippets = {
        "snippet with bookmark": associatedBookmark,
        "bookmark count": bookmarkCount,
      };
    } else {
      snippets = await Snippet.findOne({ _id: id });
    }
    if (snippets) {
      res.json(snippets);
    } else {
      res.status(404).json({ error: `snippet with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteSnippet = async (req, res) => {
  const { params } = req;
  const id = params.id;

  try {
    const deletedSnippet = await Snippet.findOneAndDelete({ _id: id });
    if (deletedSnippet) {
      console.log("Snippet deleted successfully");
      res.json({ message: "success", snippet: deletedSnippet._id });
    } else {
      res.status(404).json({ error: `snippet with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  postSnippet,
  getSnippets,
  getSnippetbyId,
  deleteSnippet,
};
