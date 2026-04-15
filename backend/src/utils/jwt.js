import jwt from "jsonwebtoken";

export const jwtSign= (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn :"7d"
    } )
}

export const verifyjwt = (token)=>{
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    return decoded;
}
