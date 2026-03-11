import jwt from 'jsonwebtoken'

export const genAccessToken = async (User) => {
    return jwt.sign(
        {
            regNo: User.regNo,
            role: User.role
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' }
    )
}

export const genRefreshToken = async (User) => {
    return jwt.sign(
        { regNo: User.regNo },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    )
}