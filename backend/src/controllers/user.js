const { StatusCodes } = require("http-status-codes");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const { UnauthentiacatedError, BadRequestError } = require("../errors");

//sign up
const signUp = asyncHandler(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.username }, token });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, fullname, email } = req.body;
  const user = await User.findByIdAndUpdate(id, { username, fullname, email }, { new: true });
  res
    .status(StatusCodes.OK)
    .json({
      userId: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
      fullname: user.fullname,
    });
    console.log(user)
});
const deleteUser = asyncHandler(async (req, res) => {
  const { id} = req.body;
  const user = await User.findByIdAndDelete(id);
  res
    .status(StatusCodes.OK)
    .json({
     msg: 'user delted'
    });
});

// sign in

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthentiacatedError("Invalid credentials");
  }
  //compare passwords
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthentiacatedError("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
});

//current user
const user = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  user,
  signIn,
  signUp,
  updateUser,
  deleteUser,
};
