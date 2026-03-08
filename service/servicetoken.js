import jwt from 'jsonwebtoken'

export const genAccessToken=async(User)=>{
    return jwt.sign(
        {regNo:User.regNo},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:'1m'}
    )
}

export const genRefreshToken=async(User)=>{
    return jwt.sign(
        {regNo:User.regNo},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:'10m'}
    )
}