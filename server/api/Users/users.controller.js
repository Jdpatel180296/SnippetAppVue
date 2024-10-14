const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./users.model.js");
const util = require("../util/index.js");
const config = require("../../config.json");
// get all users
const getusers = async (req, res) => {
  const { query } = req;
  const programming_language = query.programming_languages;

  let filter = {};
  if (programming_language) {
    filter = {
      programming_languages: { $regex: programming_language, $options: "i" },
    };
  }

  try {
    const users = await User.find(filter).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getUserbyId = async (req, res) => {
  const { params, query } = req;
  const { id } = params;

  const include_bookmarks = util.queryToBoolean(query.bookmarks);
  const include_snippets = util.queryToBoolean(query.snippets);

  let user = null;

  try {
    let Virtuals = [];
    if (include_bookmarks) {
      Virtuals.push("bookmarks");
    }
    if (include_snippets) {
      Virtuals.push("snippets");
    }

    user = await User.findOne({ _id: id })
      .select("-password")
      .populate(Virtuals);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json(`user not found with id : ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const RegisterUser = async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  try {
    /// gen salt each time
    const salt = await bcrypt.genSalt(10);

    /// hash password
    const hashed_password = await bcrypt.hash(password, salt);

    //register user with hased pass
    const user_obj = new User({ ...body, password: hashed_password });
    const saved_user = await user_obj.save();

    // convert it to js object and then remove the password
    const user = saved_user.toObject();
    delete user.password;

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const LoginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    console.log(user);

    if (!user) {
      console.log("user not found");
      return res.status(404).json({ error: "User not found" });
    }

    const user_authenticate = await bcrypt.compare(password, user.password);

    if (user_authenticate) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        config.jwt_secrect,
        {
          expiresIn: "24h",
        }
      );
      const Authenticated_user = user.toObject();
      delete user_authenticate.password;
      console.log(token);
      res.header("Authorization", `Bearer ${token}`).json(Authenticated_user);
    } else {
      res.status(401).json({ error: "invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const updateUser = async (req, res) => {
  const { params, body } = req;
  const id = params.id;
  try {
    const updated_user = await User.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (updated_user) {
      res.json(updated_user);
    } else {
      res.status(404).json(`failed to update user with id : ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  getusers,
  getUserbyId,
  RegisterUser,
  updateUser,
  LoginUser,
};
