import { cookieOptions } from "../config/config.js";
import { findUserbyemialbyPassword } from "../dao/userdao.js";

import { create_user } from "../services/authService.js";

export const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body;
    const{user, token}=await create_user(name, email, password)
    req.user= user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({
        success: true,
        message: "acc created succesfully"
    })

    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
    

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await findUserbyemialbyPassword(email)
    if (!user || password !== user.password) {
        res.status(401).json({
            success: false,
            message: "Invalid credentials",

        })
    }
    res.status(200).json({
        user
    })
    
}