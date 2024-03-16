const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

// const uri = "mongodb://0.0.0.0:27017";// connect to local mongodb compass
const url = "mongodb+srv://preethammv33:HsYxPrcv249GDVS4@cluster0.l9uozyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";// connect to mongodb atlas cloud


module.exports = async (req, res) => {
  let client = null;
  try {
    const randomSalt = Math.trunc(Math.random() * (5 - 1) + 1);
    const hash = bcrypt.hashSync(req.body.password, randomSalt); // 1 is salt , to create the randomness
    
    client = new MongoClient(url);
    const db = client.db("mernproject");
    const users = db.collection("users");
    await users.insertOne({
      userName: req.body.userName,
      lastName: req.body.lastName,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
      password: hash,
    });
    res.status(200).send({
      success: true,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "sorry, signup failed",
    });
  } finally {
    await client?.close();
  }
};
