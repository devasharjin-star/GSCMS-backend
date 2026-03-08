import bcrypt from 'bcryptjs'
import { genAccessToken,genRefreshToken } from '../service/servicetoken.js';
import User from "../models/usermodel.js";

export const registerController = async (req, res) => {
    try {
        const { regNo, password } = req.body

        const result = await User.create({
            regNo,
            password
        })
        if(result){
            res.status(200).json({
                message: result
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json("server failure")
    }
}


export const loginController = async(req, res) => {
     try {
    const { regNo, password } = req.body;

    console.log("RegNo:", regNo);
    console.log("Password:", password);

    const user = await User.findOne({ regNo });

    if (!user) {
      return res.status(401).json({
        message: "User ID does not exist"
      });
    }

    const check = (password===user.password)

    if (!check) {
      return res.status(401).json({
        message: "Username or password mismatch"
      });
    }

    const accessToken=await genAccessToken(user)
    const refreshToken=await genRefreshToken(user)

    console.log(accessToken)

    res.cookie("refreshToken",refreshToken,{
      httpOnly:true,
      secure:false,
      sameSite: "lax"
    })

    res.status(200).json({
      message: "Login successful",
      accessToken:accessToken
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server failure"
    });
  }
};