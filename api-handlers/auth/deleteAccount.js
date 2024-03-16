const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

// const uri = "mongodb://0.0.0.0:27017"; //connect to local mongodb compass
const uri = "mongodb+srv://preethammv33:HsYxPrcv249GDVS4@cluster0.l9uozyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";// connect to mongodb atlas cloud

const deleteAccount= async (req,res)=>{
let client = null;
try{
    client = new MongoClient(uri);
   const db = client.db("iothub");
   const users = db.collection("users");
   const userInfo = await users.deleteOne({ "email" : req.body.user })

   if(userInfo && bcrypt.compareSync(req.body.password, userInfo.password)){
    
    res.status(200).send({
        "success" : true,
        "message" : "Account deleted successfully"
       })
   }else{
    res.status(200).send({
        success: false,
        messsage: "wrong username or password",
      });
   }
}catch(e){
    res.status(500).send({
        "success" : false,
        "message" : "sorry, coudnt delete the account"
    })
}finally{
    await client.close();
}
}

module.exports = deleteAccount;