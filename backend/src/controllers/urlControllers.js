import generateNanoId from "../utils/createNanoId.js"
import {findslug, findUrl, saveUrl} from "../dao/urldao.js"

export const createUrlwithoutUser = async (longUrl)=>{
    const shortUrl = generateNanoId()
    await saveUrl(longUrl,shortUrl);
    return shortUrl; 
}
export const createUrlwithUser = async (longUrl, slug, userId)=>{
    const shortUrl = slug? slug :generateNanoId()
    if(slug){
        const isexistslug = await findslug(slug)
        if(isexistslug){
           throw new Error("slug already exists")
        }
    }
    await saveUrl(longUrl,shortUrl, userId);
    return shortUrl; 
}

export const getUrl = async(id)=>{
    const longUrl = await findUrl(id);
    return longUrl;
}
