import { cookieOptions } from "../config/config.js";
import { create_user, login_user } from "../services/authService.js";
import { createAccessToken, verifyRefreshToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { user,accessToken, refreshToken } = await create_user(name, email, password)
        res.cookie("refreshToken", refreshToken, cookieOptions)
        res.status(200).json({
            user,
            accessToken:accessToken,
            success: true,
            message: "account created succesfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }


}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const {user, accessToken, refreshToken}= await login_user(email,password)
        res.cookie("refreshToken", refreshToken, cookieOptions)
        res.status(200).json({
            user,
            accessToken:accessToken,
            success: true,
            message: "login successful"
        })

    }catch(error){
        res.status(400).json({
            success: false,
            message: "wrong credentials"

        });
    }

}

export const logout =  (req, res)=>{
    res.clearCookie("refreshToken", cookieOptions);
    res.status(200).json({
        success: true,
        message: "logout successful"
    })
}

export const  accesstoken = async(req,res)=>{
    try{
        const {refreshToken}= req.cookies;
        const decoded =verifyRefreshToken(refreshToken);
        const newaceesstoken = createAccessToken(decoded.id);
        
        return res.status(200).json({
            accessToken: newaceesstoken,
            success: true,
            message: "accessToken generated successfully"
        })


    }catch(err){
        return res.status(400).json({
            success: false,
            message: "Invalid refreshToken"
        })
    }
}