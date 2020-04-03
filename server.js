const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
//connect datatbase
connectDB();

//init middleware

app.use(express.json({ extended: false }));
//define routes
var cors = require("cors");
app.use(cors());

app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/daily", require("./routes/daily"));
app.use("/api/leave", require("./routes/leave"));
app.use("/api/report", require("./routes/ReportForm"));
//app.get("/", (req, res) => res.json({ msg: "welcome to the API!!" }));

const PORT = process.env.PORT || 5000;

// Server Static assests in production
app.use(express.static(path.join(__dirname, "client", "build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => console.log(`server started on port  ${PORT}`));
