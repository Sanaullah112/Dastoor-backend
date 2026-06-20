import User from "../models/user_model.js";
import bcrypt from "bcryptjs";


const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("country");    // <-- populate
    res.json({ success: true, users });
  } catch (error) {
    next()
  }
};


///Registration Setup +++++++++++
const Registration = async (req, res, next) => {
  try {
    // Data From Frontend =+=+=
    const { name, email, password, country, city } = req.body;

    //COndition For Email Cheking 
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      res.status(200).json({ message: "Your Email is Alradey Exist in database" });
      if (!country) {
        return res.status(400).json({ message: "Country is required" });
      }
    } else {
      const createUser = await User.create({ name, email, password, country, city });
      //Condition For Creating User+=+=
      if (createUser) {
        res.status(200).json({ message: "User created SuccessFully", createUser, token: await createUser.generateToken(), userID: createUser._id.toString() });
      } else {
        res.status(404).json({ message: "User created Failed" });
      }
    }
  } catch (error) {
    next(error);
  }
};


///Login Setup++++++++++++=
const Login = async (req, res, next) => {
  try {
    //Data From frontend +=== 
    const { email, password } = req.body;

    // Condition For Email Cheking===
    const emailExist = await User.findOne({ email: email });
    if (!emailExist) {
      res.status(404).json({ message: "Invalid Credentials" });
    } else {
      const passwordCompare = await bcrypt.compare(password, emailExist.password);
      if (passwordCompare) {
        res.status(200).json({ message: "Login SuccessFully", token: await emailExist.generateToken(), userID: emailExist._id.toString() })
      } else {
        res.status(404).json({ message: "Invalid Email or Password." })
      }
    };
  } catch (error) {
    next(error);

  }
};

///Admin setup+++++++
import jwt from "jsonwebtoken";

const adminLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, password },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // optional but good practice
      );
      return res.json({ success: true, token });
    } else {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    next(error);
  }
};





export { getUsers, Registration, Login, adminLogin };