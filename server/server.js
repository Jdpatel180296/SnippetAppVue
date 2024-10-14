const express = require("express");
const cors = require("cors");

const mongo = require("./mongo/mongo.js");

const app = express();
const PORT = 8080;

// options object to expose header to the client
const options = { exposedHeaders: ["Authorization"] };

// middleware to enable cors
app.use(cors(options));

//middleware to parse Post/put bodies in express
app.use(express.json());

const users = require("./api/Users/users.routes.js");
const snippets = require("./api/Snippets/snippets.routes.js");
const bookmarks = require("./api/Bookmarks/bookmarks.routes.js");

app.use("/users", users);
app.use("/snippets", snippets);
app.use("/bookmarks", bookmarks);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  mongo.connectDB();
});
