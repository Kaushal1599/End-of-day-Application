const express = require("express");

const router = express.Router();

const config = require("config");

const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");

const User = require("../models/user");

const DailyUpate = require("../models/daily_update");

const moment = require("moment");

const leave = require("../models/leave");
//@ route POST
//@ desc Register DailyUpate
//@ access private to exceutive
router.post(
  "/",
  auth,

  async (req, res) => {
    const { task, work, hour } = req.body;

    const userc = req.user.id;

    const user_id = userc;

    var currentDate = moment(Date.now()).format();
    var currentDate = String(currentDate).slice(0, 10);
    // console.log(date);

    let user = await DailyUpate.find({
      date: currentDate,
      user_id: userc,
    });

    console.log(user);

    if (user.length > 0) {
      return res.status(400).json({ msg: "DailyUpdate already exists" });
    }

    try {
      update = new DailyUpate({
        task,
        work,
        hour,
        user_id,
      });

      const Daily = await update.save();

      //console.log(Daily);

      res.json(Daily);
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
//);

router.get("/find/:name", async (req, res) => {
  //console.log("inside name");
  try {
    //const sortby = { date: -1 };
    console.log(req.params.name);

    const found = await User.find({ name: req.params.name });

    if (found.length === 0) {
      return res.status(400).json(["Employee Not Found"]);
    }

    //const data = await DailyUpate.find({ user_id: found[0]._id }).sort(sortby);

    //const leave1 = await leave.find({ user_id: found[0]._id }).sort(sortby);

    // const total = { data, leave1 };

    res.json(found);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error!!");
  }
});

router.get("/all", async (req, res) => {
  try {
    const Employee = await User.find({});
    //console.log(Employee);

    res.json(Employee);
  } catch (err) {
    console.log(err);
  }
});
router.get("/:name", async (req, res) => {
  //console.log("inside name");
  try {
    const sortby = { date: -1 };
    console.log(req.params.name);

    const found = await User.find({ name: req.params.name });

    const data = await DailyUpate.find({ user_id: found[0]._id }).sort(sortby);

    if (data.length === 0) {
      return res.status(400).json(["DailyUpdate Not Found"]);
    }

    //const leave1 = await leave.find({ user_id: found[0]._id }).sort(sortby);

    // const total = { data, leave1 };

    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error!!");
  }
});

module.exports = router;
