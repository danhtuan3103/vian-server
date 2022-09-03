const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please provide an full name!"],
  },
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
    sparse: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
});

module.exports = mongoose.model("User", UserSchema);
