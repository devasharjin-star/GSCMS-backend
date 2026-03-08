import jwt from 'jsonwebtoken'
import { genAccessToken } from "../service/servicetoken.js"

export const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken

    if (!token) {
       return res.status(401).json({
            message:"Token is missing"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

        const newAccessToken = genAccessToken({
            regNo: decoded.regNo
        })
        console.log("new access token :",newAccessToken)

        res.status(200).json({
            accessToken: newAccessToken

        })
    } catch (e) {
        console.log(e)
        return res.status(403).json({
            message: "Invalid refresh token"
        });
    }


}