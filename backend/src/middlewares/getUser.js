import { verifyjwt } from "../utils/jwt.js";

export const getUserId = (req, res, next)=>{
    const token = req.cookies?.accessToken;
   const user = token ? verifyjwt(token) : null;

   req.user = user;
   console.log(user)
   next();  
}