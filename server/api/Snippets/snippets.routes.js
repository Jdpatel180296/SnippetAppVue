const router = require("express").Router();

const controller = require("./snippets.controller");
const authorization = require("../Middleware/Authorization");
router.get("/", controller.getSnippets);

router.get("/:id", controller.getSnippetbyId);

// // create snippet

router.post("/", authorization.verifytoken, controller.postSnippet);

// delete snippet by id
// set snippet_id to null in bookmarks

router.delete("/:id", authorization.verifytoken, controller.deleteSnippet);

module.exports = router;
