const router = require("express").Router();
const controller = require("./bookmarks.controller");

// const bookmarks = require("../../mock_database/bookmarks.json");
// const snippets = require("../../mock_database/snippets.json");
// const users = require("../../mock_database/users.json");

router.post("/", controller.createBookmark);

// router.post("/", (req, res) => {
//   const { body } = req;

//   const ids = bookmarks.map((bookmark) => bookmark.id);
//   const id = Math.max(...ids) + 1;

//   const bookmark = { id, ...body };

//   bookmarks.push(bookmark);

//   res.json(bookmark);
// });

router.delete("/:id", controller.deleteBookmark);
//   const { params } = req;

//   const id = parseInt(params.id);
//   const ids = bookmarks.map((bookmark) => bookmark.id);
//   if (!ids.includes(id)) {
//     res.status(404).json({ error: `user with id ${id} not found` });
//   }

//   const bookmark = bookmarks.find((bookmark) => bookmark.id === id);
//   const userID = users.find((user) => user.id === bookmark.user_id);
//   const snippetID = snippets.find(
//     (snippet) => snippet.id === bookmark.snippet_id
//   );

//   if (bookmark) {
//     const index = bookmarks.indexOf(bookmark);
//     const userIndex = users.indexOf(userID);
//     const snippetIndex = snippets.indexOf(snippetID);

//     bookmarks.splice(index, 1);
//     users.splice(userIndex, 1);
//     snippets.splice(snippetIndex, 1);

//     res.json(bookmark);
//   } else {
//     res.status(404).json({ error: `bookmark with id ${id} not found` });
//   }
// });
// router.get("/", (req, res) => {
//   res.json(bookmarks);
// });

module.exports = router;
