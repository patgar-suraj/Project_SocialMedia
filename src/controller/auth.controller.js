const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

async function registerController(req, res) {
  const { username, password } = req.body;

  const existUser = await userModel.findOne({ username });
  if (existUser) {
    return res.status(400).json({
      message: "username already in use",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10)
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  res.status(201).json({
    message: "user registerd successfully",
    user,
  });
}

async function loginController(req, res){
    const {username, password} = req.body

    const user = await userModel.findOne({username})
    if(!user){
        return res.statue(400).json({
            message: "user not exist"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(200).json({
        message: "user loggedin successfully",
        user: {
            username: user.username,
            id: user._id
        }
    })
}

module.exports = {
    registerController,
    loginController
}