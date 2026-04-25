import { createUser, findUserbyEmail } from "../dao/userdao.js"
import { jwtSign } from "../utils/jwt.js";

export const  create_user = async(name, email, password)=>{
    if(!name||!email||!password){
       throw new Error("all fields are required")
    }
    const getuser = await findUserbyEmail(email);
    if(getuser){
        throw new Error("user already exists")
       
    }
    const user = await createUser(name, email, password);
    const token = jwtSign(user._id)
    return {user,token}
}

export const login_user = async(email,password)=>{
    
    const user = await findUserbyEmail(email)

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid credentials")
    }

    const token = jwtSign(user._id)
    return {user, token}
}