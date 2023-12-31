const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'please provide fullname']
    },

    username: {
        type: String,
        required: [true, 'please provide username']
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
          ],
        unique: [true, "Email address taken!"],
    },

    password: {
        type: String,
        required: [true, 'please provide password']
    },
    role: {
      type: String,
      default: 'admin'
  }


},{timestamps: true})


adminSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  adminSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.username, role: this.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }

    );
  };

  adminSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  };

module.exports = mongoose.model("Admin", adminSchema);

