import userModel from "../models/user.model.js"

export const createUser = async (name, email, password)=>{
    const newUser = new userModel({name, email, password})
    await newUser.save();
    return newUser;
}


export const findUserbyEmail = async(email)=>{
    return await userModel.findOne({email}).select("+password")
}

export const findUserbyId =async (id)=>{
    return await userModel.findById(id)
}