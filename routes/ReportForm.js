const express = require("express");

const router = express.Router();

const config = require("config");

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = require("../middleware/auth");

const ReportForm = require("../models/Report");

const moment = require("moment");

//@ route POST
//@ desc Register DailyUpate
//@ access private to exceutive
router.post(
  "/",
  auth,

  async (req, res) => {
    const { total, recieved, not_recieved, response } = req.body;
    const userc = req.user.id;

    const user_id = userc;

    try {
      var currentDate = moment(Date.now()).format();
      currentDate = String(currentDate).slice(0, 10);
      //console.log(date);

      let user = await ReportForm.find({ date: currentDate, user_id: userc });

      console.log(user);

      if (user.length > 0) {
        return res.status(400).json({ msg: "Form already exists" });
      }

      update = new ReportForm({
        total,
        recieved,
        not_recieved,
        response,
        user_id,
      });

      const Daily = await update.save();

      //  console.log(req.user);

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

router.get("/find/:name", async (req, res) => {
  //console.log("inside Leave");

  //console.log(req.params.name);
  try {
    const sortby = { date: -1 };
    const found = await User.find({ name: req.params.name });

    //console.log(found);

    // const data = await DailyUpate.find({ user_id: found[0]._id }).sort(sortby);

    const form = await ReportForm.find({ user_id: found[0]._id }).sort(sortby);

    if (form.length === 0) {
      return res.status(400).json(["Form Not Found"]);
    }

    //console.log(form);

    // const total = { data, leave1 };

    res.json(form);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error!!");
  }
});
//);
module.exports = router;
