const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

async function registerController(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
      });
    }

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
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.status(201).json({
      message: "user registered successfully",
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    console.log("Registration error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
}

async function loginController(req, res){
  try {
    const {username, password} = req.body

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
      });
    }

    const user = await userModel.findOne({username})
    if(!user){
        return res.status(400).json({
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
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username
        }
    })
  } catch (err) {
    console.log("Login error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
}

async function logoutController(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  
  res.status(200).json({
    message: "logged out successfully"
  });
}

async function checkAuthController(req, res) {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        message: "no token found"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "user not found"
      });
    }

    res.status(200).json({
      message: "user authenticated",
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    res.status(401).json({
      message: "invalid token"
    });
  }
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    checkAuthController
}