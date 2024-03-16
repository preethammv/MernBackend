const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

// const uri = "mongodb://0.0.0.0:27017"; // connect to local mongodb compass
const uri = "mongodb+srv://preethammv33:HsYxPrcv249GDVS4@cluster0.l9uozyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";// connect to mongodb atlas cloud


const resetPassword = async (req, res) => {
  let client = null;
  try {
    const randomSalt = Math.trunc(Math.random() * (5 - 1) + 1);
    const hash = bcrypt.hashSync(req.body.password, randomSalt);

    client = new MongoClient(uri);
    const db = client.db("mernproject");
    const users = db.collection("users");
    const result = await users.updateOne({ email: req.body.email }, { $set: { password: hash } });
    res.status(200).send({
      success: true,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "sorry, reset password failed",
    });
  } finally {
    await client?.close();
  }
};

module.exports = resetPassword;
