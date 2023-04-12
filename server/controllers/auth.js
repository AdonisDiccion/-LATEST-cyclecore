import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Order from "../models/order.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    // 1. destructor name, email, passwprd from req.body
    const {
      firstname,
      lastname,
      email,
      password,
      address,
      contactnum,
      birthdate,
    } = req.body;
    const today = new Date();
    const birthdateObject = new Date(birthdate);
    const age = today.getFullYear() - birthdateObject.getFullYear();
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    const phoneRegex = /^\d{11}$/;
    // 2. all fields require validation
    if (!firstname.trim()) {
      return res.json({ error: "Firstname is required" });
    }
    if (!lastname.trim()) {
      return res.json({ error: "Lastname is required" });
    }
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    // if(!contactnum.trim()){
    //     return res.json({error: "Contact Number is required"});
    // }
    if (age < 18) {
      return res.json({
        error: "You must be atleast 18 years old to register",
      });
    }
    if (!passwordRegex.test(password)) {
      return res.json({
        error:
          "Password must contain at least one uppercase letter, one special character, and one number, and be at least 8 characters long.",
      });
    }
    // if (!phoneRegex.test(contactnum)) {
    //     return res.json({ error: "Phone number must have 11 digits only." });
    //   }
    // 3. check if email is taken.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }
    // 4. hash passwor
    const hashedPassword = await hashPassword(password);
    // 5. register user
    const user = await new User({
      firstname,
      lastname,
      email,
      birthdate,
      address,
      contactnum,
      password: hashedPassword,
    }).save();
    // 6. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthdate: user.birthdate,
        role: user.role,
        address: user.address,
        contactnum: user.contactnum,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    // 1. destructor name, email, passwprd from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    // 3. check if email is none.
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // 4. compare password
    const matchpass = await comparePassword(password, user.password);
    if (!matchpass) {
      return res.json({ error: "Wrong password" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 6. send response
    res.json({
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        birthdate: user.birthdate,
        contactnum: user.contactnum,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { firstname, lastname, password, address, email } = req.body;
    const user = await User.findById(req.user._id);
    // check password length
    if (
      password &&
      !/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)
    ) {
      return res.json({
        error:
          "Password should contain at least one uppercase letter, one special character, and one number, and be at least 8 characters long",
      });
    }
    //hash password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
        password: hashedPassword || user.password,
        address: address || user.address,
        email: email || user.email,
      },
      {
        new: true,
      }
    );

    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "photo name")
      .populate("buyer", "firstname")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "firstname lastname");
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};
