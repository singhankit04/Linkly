import { verifyAccessToken, } from "../utils/jwt.js";

export const getUserId = (req, res, next)=>{
   const accessToken =req.headers.authorization?.split(" ")[1];
   const decoded =accessToken ? verifyAccessToken(accessToken) : null;

   req.user = decoded
   next();  
}