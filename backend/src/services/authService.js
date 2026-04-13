import { createUser } from "../dao/userdao.js"
import { jwtSign } from "../utils/jwt.js";

export const  create_user = async(name, email, password)=>{
    if(!name||!email||!password){
        res.status(401).json({
            status: false,
            message: "all fields are required"
        })
    }
    const user = await createUser(name, email, password);
    const token = jwtSign(user._id)
    return { user,token}
}
