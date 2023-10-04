const { StatusCodes } = require("http-status-codes")
const Admin = require("../model/admin")
// const User = require("../model/user")
const asyncHandler = require("express-async-handler")

//sign up
const signUp = asyncHandler(async(req, res) => {
    const user = await Admin.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED)
    .json({ user: { name: user.username }, token })
}
)



// sign in

const signIn = asyncHandler(async(req, res) => {

const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await Admin.findOne({ email });
  if (!user) {
    throw new UnauthentiacatedError("Invalid credentials");
  }
  //compare passwords
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthentiacatedError("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.username }, token });}
)

//current user
const user = asyncHandler(async(req, res) => {
    res.json(req.user)
})

// const users = asyncHandler(async(req, res)=>{
//     res.send('wsip')
// })


module.exports = {
    user,
    signIn,
    signUp,
    // users
}
