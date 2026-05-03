import axiosInstance from "../utils/axiosInstance";

export const getPublicLinks = async() =>{
    const {data} = await axiosInstance.get('/url/get/public')
    return data.allUrl;
}

export const getPrivateLinks = async() =>{
    const {data} = await axiosInstance.get('/url/get/private')
    
    return data.allUrl;
}

export const createPublicLink = async(linkinfo)=>{
    const {data}= await axiosInstance.post('/url/create/public', linkinfo)
    return data.shortUrl;
}

export const addPrivateLink = async(linkinfo)=>{
    const {data}= await axiosInstance.post('/url/create/private', linkinfo)
    return data.shortUrl;
}

export const getPublicLinkbyUser = async()=>{
    const {data} = await axiosInstance.get('/url/get/publicbyuser')
    return data.allUrl;
}

export const redirect = async(shortUrl)=>{
    const {data} =await axiosInstance.get(`/url/redirect/${shortUrl}`)
    return data;
}