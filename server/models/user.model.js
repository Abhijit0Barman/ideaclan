const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      enum: ["admin", "user"],
    },
  },
  { timestamps: true, versionKey: false }
);

//Model
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
