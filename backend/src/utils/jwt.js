import jwt from "jsonwebtoken";

export const createAccessToken= (id)=>{
    return jwt.sign({id}, process.env.ACCESS_SECRET,{
        expiresIn :"15m"
    } )
}

export const createRefreshToken=(id)=>{
    return jwt.sign({id}, process.env.REFRESH_SECRET,{
        expiresIn:"7d"
    })
}
export const verifyRefreshToken = (token)=>{
    const decoded = jwt.verify(token , process.env.REFRESH_SECRET)
    return decoded;
}
export const verifyAccessToken = (token)=>{
    const decoded = jwt.verify(token , process.env.ACCESS_SECRET)
    return decoded;
}
