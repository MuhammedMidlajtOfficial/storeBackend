const express = require("express");
const router = express.Router();

const User = require("../models/user");

// add User
router.post("/addUser", async (req, res) => {
  const user = req.body;
  const data = {
    username: user.username,
    password: user.password,
  };

  const userObj = new User(data);

  try {
    const response = await userObj.save();
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occured while adding user" });
  }
});

// get all users
router.get("/getAllUsers", async (req, res) => {
  try {
    const response = await User.find();
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.json({ success: false, message: "Error occured while fetching users" });
  }
});

// edit user by username
router.post("/editUser", async (req, res) => {
  const username = req.body.username;
  const user = req.body;
  const data = {
    username: user.username,
    password: user.password,
  };

  try {
    let doc = await User.findOneAndUpdate({ username: username }, data);
    res.json({
      success: true,
      data: doc,
    });
  } catch (error) {
    res.json({ success: false, message: "Error occured while updating user" });
  }
});

// delete user by id
router.post("/deleteUser", async (req, res) => {
  const id = req.body.id;
  try {
    let doc = await User.findOneAndDelete({ _id: id });
    res.json({
      success: true,
      data: doc,
    });
  } catch (error) {
    res.json({ success: false, message: "Error occured while deleting user" });
  }
});

// login user
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const data = {
    username: username,
    password: password,
  };
  try {
    const response = await User.find(data);
    if (response.length > 0) {
      res.json({
        success: true,
        data: response,
        admin: username.split(" ")[0] === "admin" ? true : false,
      });
    } else {
      res.json({ success: false, message: "Error occured while logging in" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error occured while logging in" });
  }
});

// isUserExists
router.post("/isUserExists", async (req, res) => {
  const username = req.body.username;


  try {
    const user = await User.find({ username: username });
    if (user.length > 0) {
      res.json({
        success: true,
        data: user,
      });
    } else {
      res.json({ success: false, message: "there is no user with this username" });

    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occured while logging in",error:error });
  }
});

module.exports = router;
