import generateNanoId from "../utils/createNanoId.js"
import {findUrl, saveUrl} from "../dao/urldao.js"

export const createUrl = async (longUrl)=>{
    const shortUrl = generateNanoId()
    console.log(shortUrl)
    await saveUrl(longUrl,shortUrl);
    return shortUrl; 
}

export const getUrl = async(id)=>{
    const longUrl = await findUrl(id);
    return longUrl;
}
