import { cookieOptions } from "../config/config.js";
import { create_user, login_user } from "../services/authService.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { user, token } = await create_user(name, email, password)
        res.cookie("accessToken", token, cookieOptions)
        res.status(200).json({
            user,
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
        const {user, token}= await login_user(email,password)
        res.cookie("accessToken", token, cookieOptions)
        res.status(200).json({
            user,
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