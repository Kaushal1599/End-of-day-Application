const express = require("express");

const router = express.Router();

const config = require("config");

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = require("../middleware/auth");

const Leave = require("../models/leave");

//@ route POST
//@ desc Register DailyUpate
//@ access private to exceutive
router.post(
  "/",
  auth,

  async (req, res) => {
    const { holiday, date_holiday, reason } = req.body;

    const user_id = req.user.id;

    console.log("HEllo");

    try {
      apply = new Leave({
        holiday,
        date_holiday,
        reason,
        user_id
      });

      const Leave1 = await apply.save();

      //  console.log(req.user);

      res.json(Leave1);
    } catch (err) {
      /*   const payload = {
        update: {
          id: update.id
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
    }*/ console.log(
        err.message
      );
      res.status(500).send("server error!!");
    }
  }
);

router.get("/find/:name", async (req, res) => {
  //console.log("inside Leave");

  //console.log(req.params.name);
  try {
    const found = await User.find({ name: req.params.name });

    //console.log(found);

    // const data = await DailyUpate.find({ user_id: found[0]._id }).sort(sortby);

    const leave1 = await Leave.find({ user_id: found[0]._id });

    if (leave1.length === 0) {
      return res.status(400).json(["Leave Not Found"]);
    }

    //console.log(leave1);

    // const total = { data, leave1 };

    res.json(leave1);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error!!");
  }
});
//);
module.exports = router;
