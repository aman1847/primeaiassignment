const express=require("express")
const app=express()
const connectdb=require("./config/db")
const cors=require("cors")
const port=3000
app.use(express.json())
app.use(cors())
connectdb()
const jwt = require("jsonwebtoken");

const Student = require("./models/Signup"); 
const md = require("./models/crud");
const bcrypt = require("bcrypt");


// Signup api
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "All fields required" });
    }

    // 🔐 HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,  // save hashed password
    });

    await newStudent.save();

    res.json({ message: "Signup successful" });

  } catch (error) {
    res.json({ message: "Error", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ message: "All fields required" });

    const user = await Student.findOne({ email });

    if (!user)
      return res.json({ message: "User not found" });

    // 🔐 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({ message: "Invalid password" });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      "mysecretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.json({ message: "Server error" });
  }
});


// crud api 

// post
app.post("/addclient", async (req, res) => {
  try {
    const { clientname, phonenumber, address } = req.body;

    const newClient = new md({
      clientname,
      phonenumber,
      address
    });

    await newClient.save();

    res.json(newClient);

  } catch (error) {
    res.json({ error: error.message });
  }
});
//  getclients
// Get all clients
app.get("/getclient", async (req, res) => {
  try {
    const clients = await md.find(); // fetch all clients
    res.json(clients); // send data
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Update Client
app.put("/updateclient/:id", async (req, res) => {
  try {
    const { clientname, phonenumber, address } = req.body;

    const updatedClient = await md.findByIdAndUpdate(
      req.params.id,
      { clientname, phonenumber, address },
      { new: true }
    );

    res.json(updatedClient);

  } catch (error) {
    res.json({ error: error.message });
  }
});

// Delete Client
app.delete("/deleteclient/:id", async (req, res) => {
  try {
    await md.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});






app.listen(port,()=>{
    console.log("connection is running on port number",port)
})