import { createAccessToken, verifyRefreshToken, verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = async(req, res, next)=>{
    try{
        const accessToken= req.headers.authorization?.split(" ")[1];
        if (!accessToken){
            const refreshtoken= req.cookies.refreshToken;
            if(!refreshtoken){
                return res.status(401).json({
                success: false,
                message : "refreshToken not found"
            })
            }
            const decoded =verifyRefreshToken(refreshtoken);
            req.user = decoded;
            const newAccessToken= createAccessToken(decoded.id);
            req.headers.authorization = `Bearer ${newAccessToken}`   
        } else {
            const decoded = verifyAccessToken(accessToken);
            req.user = decoded;
        }
        return next()
    }catch(error){
            res.status(401).json({
            success: false,
            message: "invalid token"
        })
    }
}