const express = require("express");
const router = express.Router();
const Poems = require("../models/Poems");
const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminLayout = '../views/layouts/admin'
/*
 * get/
 *  admin - login page
 *
 */

router.get("/admin", async (req, res) => {
    try {
    const locals = {
        title: "Admin",
        description: "Simple Blog created with NodeJs, Express &amp; MongoDb."
    }

      res.render("admin/login", { locals , layout: adminLayout });

    } catch (error) {
      console.log(error);
    }

});



/*
 * Poems/
 *  admin - check login
 *
 */
router.post('/admin', async (req, res) => {
  try {
    const { username , password } = req.body;
    // console.log(req.body);
    if(req.body.username === 'admin' && req.body.password === "password") {
      res.send("You are logged in.")
    }else {
      res.send('error')
    }
    
  } catch (error) {
    console.log(error);
  }
})
/*
 * Poems/
 *  admin - register
 *
 */
router.post('/register', async (req, res) => {
  try {
    const { username , password } = req.body;
 
    if(req.body.username === 'admin') {
      res.send("User creating not allowed")
      return 
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const user = await User.create( { username, password: hashedPassword })
      res.status(201).json( { message: "User Created", user })
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({ message: "User already in use"})
      }
      res.status(500).json({ message: "Internal server error"})  
      }
    
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;