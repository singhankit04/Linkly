import { saveUrl } from "../dao/urldao.js";
import generateNanoId from "../utils/createNanoId.js"

export const createUrlWithoutUser = async (longUrl)=>{
    const shortUrl = generateNanoId();
    await saveUrl(shortUrl, longUrl);
    return shortUrl;

}


export const createUrlWithUser = async (longUrl, userId)=>{
    const shortUrl = generateNanoId();
    await saveUrl(shortUrl, longUrl, userId);
    return shortUrl;

}
