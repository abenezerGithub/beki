require("dotenv").config({ path: "./dev.env" });
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("./model/User");
const adminModel = require("./model/Admin");
mongoose
  .connect(
    "mongodb+srv://abenezer_123:A4Qi9uUGPe9iz7SE@cluster0.vc6yvwc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log("DB Error", err));

class User {
  constructor(name, email, subject, message) {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
  }
  async save() {
    const user = new userModel(this);
    try {
      const data = await user.save();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/client"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app
  .route("/")
  .get((req, res) => res.sendFile(__dirname + "/client/index.html"));

app.route("/admin").get((req, res) => {
  res.sendFile(__dirname + "/client/admin/index.html");
});

app.route("/register").post((req, res) => {
  const { name, email, subject, message } = req.body;
  const user = new User(name, email, subject, message);

  user.save();
  res.redirect("/");
});

app.route("/dashboard")
.get((req,res) => {
  console.log("cook",req.cookies)
  
  res.sendFile(
    __dirname + "/client/dashboard/dashboard-blogen-theme/index.html"
  );
});

app.route("/admin/login")
.post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const cred = { email, password };
  try {
    const admin = await adminModel.findOne({ email, password });
  if (admin) {
    const data = {id:admin.__id,email:admin.email};
  const token = jwt.sign(data,"bekisecret",{expiresIn:"1h"});
  
    console.log(token)
       res.redirect("/dashboard?t=" + token);
    } else {
       res.redirect("/admin");
    }
  } catch (err) {
     res.redirect("/admin");
  }
});

app.route("/admin/check")
.post((req,res) => {
 const token = req.query.t;
 jwt.verify(token,"bekisecret",(err,result) => {
   console.log(result,token)
   if(!result) {
   res.status(401)
   return  res.json({error:"unauthenticated "})
   }
  return  res.json({success:"authorised"})
 })
})



app.route("/api/users").get(async (req, res) => {
  const data = await userModel.find();
  res.json({ data });
}); 


app.listen(8000);