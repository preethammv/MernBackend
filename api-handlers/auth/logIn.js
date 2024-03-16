const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

// const uri = "mongodb://0.0.0.0:27017"; // connect to local mongodb compass
const uri = "mongodb+srv://preethammv33:HsYxPrcv249GDVS4@cluster0.l9uozyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";// connect to mongodb atlas cloud

module.exports = async (req, res) => {
  let client = null;
  try {
    client = new MongoClient(uri);
    const db = client.db("mernproject");
    const users = db.collection("users");
    const userInfo = await users.findOne({
      email: req.body.email,
    });

    if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
      res.status(200).send({
        success: true,
        data: {
          userName : userInfo.userName,
          email : userInfo.email,
          phoneNo : userInfo.phoneNo
        },
      });
    } else {
      res.status(200).send({
        success: false,
        messsage: "wrong username or password",
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      messsage: "something went wrong",
    });
  } finally {
    await client?.close();
  }
};
