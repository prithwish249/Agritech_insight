const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { generateOTP, sendOTP } = require("./utils/otp");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
  location: String,
  otp: String, // Add OTP field to the schema
});

const User = mongoose.model("User", UserSchema);

// Endpoint for sending OTP or registering new user
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    // If user doesn't exist, create a new instance
    if (!user) {
      const otp = generateOTP();
      user = new User({ email, otp });
      await user.save();
    } else {
      // Generate new OTP for existing user
      const otp = generateOTP();
      user.otp = otp;
      await user.save();
    }

    // Send the OTP via email
    await sendOTP(email, user.otp);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
});




app.post("/api/login", async (req, res) => {
  const { email, name, location, otp } = req.body;
  
  try {
    // Find the user by email and OTP
    const user = await User.findOne({ email, otp });

    if (user) {
      // Update user's name and location
      user.name = name;
      user.location = location;
      await user.save();

      // If user found with matching OTP, proceed with login
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Incorrect OTP" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, error: "Failed to login" });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
