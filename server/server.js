const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task.route.js");
const authRoutes = require("./routes/auth.route.js")
require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(cors(
  {
    origin: '*'
  }
));
const uri = process.env.DB_URI //"mongodb://127.0.0.1:27017/todo"
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OK");
  })
  .catch((err) => {
    console.log("CONNECTION IS BAD");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/task", taskRoutes);

app.use('/api/auth', authRoutes)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
