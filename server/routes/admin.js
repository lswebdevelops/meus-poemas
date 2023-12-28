const express = require("express");
const router = express.Router();
const Poems = require("../models/Poems");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

// check login

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

/*
 * get/
 *  admin - login page
 *
 */

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express &amp; MongoDb.",
    };

    res.render("admin/login", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/*
 * post/
 *  admin - check login
 *
 */

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalide credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalide credentials" });
    }
    const token = jwt.sign({ userID: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/*
 * get/
 *  dashboard - check login
 *
 */

router.get("/dashboard", authMiddleware,  async (req, res) => {
 

  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express &amp; MongoDb.",
    };

    const data = await Poems.find();
    res.render("admin/dashboard", {
      locals, 
      data
    });

  } catch (error) {
    console.log(error);
  }
});

/**
 * get
 * Admin - create new post
 */

router.get("/add-poem", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Adicionar Poema",
      description: "Simple Blog created with NodeJs, Express & MongoDB",
    };

    const data = await Poems.find();
    res.render("admin/add-poem", {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});
/*
 * post/
 *  admin -create new poem
 *
 */

router.post("/add-poem", authMiddleware,  async (req, res) => {

    try {
      try {
        const newPoem = new Poems({
          title: req.body.title,
          body: req.body.body,
          author: req.body.author

        });
        await Poems.create(newPoem);
        res.redirect('/dashboard');
      } catch (error) {
        console.log(error);
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
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (req.body.username === "admin") {
      res.send("User creating not allowed");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
