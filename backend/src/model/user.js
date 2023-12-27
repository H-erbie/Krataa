const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'please provide fullname'],
        trim: true
    },

    username: {
        type: String,
        required: [true, 'please provide username'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
          ],
        unique: [true, "Email address taken!"],
    },
    program: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: [true, 'please provide password']
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: 'user'
  }

},{timestamps: true})


userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next()
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
  } catch (error) {
    throw error
  }
    
  });
  
  userSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.username, role: this.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }

    );
  };

  userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw error
    }
  };

module.exports = mongoose.model("User", userSchema);
