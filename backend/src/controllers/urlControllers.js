import shortUrl from "../utils/createNanoId.js"
import {findUrl, saveUrl} from "../services/urlServices.js"

export const createUrl = async (longUrl)=>{
    await saveUrl(longUrl,shortUrl);
    return shortUrl; 
}

export const getUrl = async(id)=>{
    const longUrl = await findUrl(id);
    return longUrl;
}
