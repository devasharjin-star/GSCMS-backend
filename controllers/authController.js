import bcrypt from 'bcryptjs'
import { genAccessToken,genRefreshToken } from '../service/servicetoken.js';
import User from "../models/usermodel.js";

export const registerController = async (req, res) => {
  try {
    const { regNo, password, role } = req.body;

    /* ========= VALIDATION ========= */

    if (!regNo || !password || !role) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    /* ========= CHECK EXISTING USER ========= */

    const existingUser = await User.findOne({ regNo });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    /* ========= HASH PASSWORD ========= */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* ========= CREATE USER ========= */

    const newUser = await User.create({
      regNo,
      password: hashedPassword,
      role
    });

    /* ========= RESPONSE ========= */

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        regNo: newUser.regNo,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Server failure"
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const { regNo, password } = req.body;

    /* ========= VALIDATION ========= */

    if (!regNo || !password) {
      return res.status(400).json({
        message: "User ID and password are required"
      });
    }

    /* ========= FIND USER ========= */

    const user = await User.findOne({ regNo });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    /* ========= PASSWORD CHECK ========= */

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    /* ========= TOKENS ========= */

    const accessToken = await genAccessToken(user);
    const refreshToken = await genRefreshToken(user);

    /* ========= COOKIE ========= */

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in prod
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    /* ========= RESPONSE ========= */

    res.status(200).json({
      message: "Login successful",
      accessToken,
      role: user.role
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server failure"
    });
  }
};