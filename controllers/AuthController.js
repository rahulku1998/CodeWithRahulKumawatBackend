const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      experience,
      college,
      linkedin,
      github,
      leetcode,
    } = req.body;

    if (!name || !email || !password || !college) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if(password.length<6){
      return res.status(400).json({
        message:"Password must be at least 6 characters long"
      })
    }
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user=await User.create({
      name,
      email,
      password: hashedPassword,
      experience,
      college,
      linkedin,
      github,
      leetcode,
    });

    
      await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Student is Registered whose  name is : ${name}`,
      html: `
        <h2>New User Details are </h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>College:</b> ${college}</p>
        <p><b>Linkedin:</b> ${linkedin}</p>
        <p><b>github:</b> ${github}</p>
        <p><b>leetcode:</b> ${leetcode}</p>
        <p><b>experience:</b> ${experience}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email, // user ka email 
      subject: "Thank you for Registration ",
      html: `
        <h2>Thank You for Registration !</h2>
        <p>Hi ${name},</p>
        <p>Explore Courses and Notes available on our platfoem and get Touch with us for latest 
        update.</p>
        <p>Regards,<br/>Rahul Kumawat</p>
      `,
    });
      
    return res.status(201).json({
      success: true,
      message: "Congrats! Your registration is successful",
       user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    experience: user.experience,
    college: user.college,
    linkedin: user.linkedin,
    github: user.github,
    leetcode: user.leetcode,
  },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "You are not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Your password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        experience: user.experience,
        college: user.college,
        linkedin: user.linkedin,
        github: user.github,
        leetcode: user.leetcode,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};