
import axiosInstance from "../utils/axiosInstance";

export const Login = async (formData) => {
    const res =await axiosInstance.post('/auth/login', {
        email: formData.email,
        password: formData.password
    });
    
    return res;
}

export const Signup = async (formData) => {
    return await axiosInstance.post('/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
    });
}

export const Logout = async () => {

   return await axiosInstance.post('/auth/logout')
    
}