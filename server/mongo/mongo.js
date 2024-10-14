// uri: "mongodb+srv://jaydeep9gondaliya:JDmongo32@cluster0.orkyqqe.mongodb.net/?retryWrites=true&w=majority",

const mongoose = require("mongoose");

const { username, password, projectname } = require("../config.json");
const dburi = `mongodb+srv://${username}:${password}@cluster0.orkyqqe.mongodb.net/${projectname}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(dburi);
    console.log(`you have connected to the Jaydeep/${projectname} database`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB };
