import generateNanoId from "../utils/createNanoId.js"
import {findAllUrl, findAllUrlwithUser, findslug, findUrl, saveUrl} from "../dao/urldao.js"

export const createUrlwithoutUser = async (longUrl, slug, secretMessage)=>{
    const shortUrl =slug? slug: generateNanoId();
    if(slug){
        const isexistslug = await findslug(slug)
        if(isexistslug){
           throw new Error("slug already exists")
        }
    }
    await saveUrl(longUrl,shortUrl, null, secretMessage);
    return shortUrl; 
}
export const createUrlwithUser = async (longUrl, slug, userId, secretMessage)=>{
    const shortUrl = slug? slug :generateNanoId()
    if(slug){
        const isexistslug = await findslug(slug)
        if(isexistslug){
           throw new Error("slug already exists")
        }
    }
    await saveUrl(longUrl,shortUrl, userId, secretMessage);
    return shortUrl; 
}

export const getUrlwithoutUser = async()=>{
    const allUrl = await findAllUrl();
    return allUrl;
}


export const getUrlwithUser = async (id)=>{
    const allUrl = await findAllUrlwithUser(id);
    return allUrl;
}

export const getUrl = async (shorturl)=>{
    const longUrl = await findUrl(shorturl);
    return longUrl;
}
