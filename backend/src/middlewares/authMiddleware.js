import { findUserbyEmail } from "../dao/userdao.js";
import {jwtSign, verifyjwt } from "../utils/jwt.js";

export const authMiddleware = async(req, res, next)=>{
    try{
        const token= req.cookies.accessToken;
        if (!token){
            return res.status(401).json({
                success: false,
                message : "token not found"
            })
        }
        const decoded = verifyjwt(token);
        req.user = decoded;
        next()
    }catch(error){
            res.status(401).json({
            success: false,
            message: "invalid token"
        })
    }
}