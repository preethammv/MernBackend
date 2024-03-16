const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoute = require('./routers/auth')
const mongoose = require("mongoose"); 

const app = express(); //creating app obj by calling express function

//////////////////////////////////////////////////////////////
// done this on 14/03/2024
// Connect to MongoDB
mongoose.connect('mongodb+srv://preethammv33:HsYxPrcv249GDVS4@cluster0.l9uozyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

/////////////////////////////////////////////////////////////////

app.use(bodyParser.json()); //configuring bodyparser middlewear to parse json body

app.use(
  cors({
    origin: "*",
  })
);

app.use("/",authRoute);

app.get("/", (req, res) => {
  // handling  default route /
  res.send("server");
});

app.listen(4000, "0.0.0.0", () => {
  // configuring server to listen to 4000 port
  console.log("server is running at port 4000");
});
