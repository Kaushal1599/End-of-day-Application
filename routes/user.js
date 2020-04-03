const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const config = require("config");

const { check, validationResult } = require("express-validator");

const User = require("../models/user");

// @route  POST api/users
// @desc  Register a user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("emp_id", "empid is requird")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter the password with 6 or more characters"
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, emp_id, email, password } = req.body;

    //const { image } = req.file.filename;

    try {
      let user = await User.findOne({ emp_id });
      if (user) {
        return res.status(400).json({ msg: "user already exists" });
      }

      user = new User({
        name,
        emp_id,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error!!");
    }
  }
);

module.exports = router;
