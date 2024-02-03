import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is mandatory"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "email is mandatory"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//below methods are known as instance method of Schema
UserSchema.methods.createJWT = function () {
  const token = jwt.sign({ userId: this._id, name: this.name }, "JWTSecret", {
    expiresIn: "30d",
  });
  return token;
};

export default mongoose.model("User", UserSchema);
