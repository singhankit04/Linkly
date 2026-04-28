import generateNanoId from "../utils/createNanoId.js"
import {findAllUrl, findAllUrlprivate, findPublicUrlbyUser, findslug, findUrl, saveUrl} from "../dao/urldao.js"

export const createUrlpublic = async (longUrl, slug, secretMessage, userId)=>{
    const shortUrl =slug? slug: generateNanoId();
    if(slug){
        const isexistslug = await findslug(slug)
        if(isexistslug){
           throw new Error("slug already exists")
        }
    }
    await saveUrl(longUrl,shortUrl,userId, secretMessage);
    return shortUrl; 
}
export const createUrlprivate = async (longUrl, slug, userId, secretMessage)=>{
    const shortUrl = slug? slug :generateNanoId()
    if(slug){
        const isexistslug = await findslug(slug)
        if(isexistslug){
           throw new Error("slug already exists")
        }
    }
    await saveUrl(longUrl,shortUrl, userId, secretMessage, "private");
    return shortUrl; 
}

export const getUrlpublic = async()=>{
    const allUrl = await findAllUrl();
    return allUrl;
}


export const getUrlprivate = async (id)=>{
    const allUrl = await findAllUrlprivate(id);
    return allUrl;
}

export const getPublicUrlbyUserId = async(id)=>{
    const urls = await findPublicUrlbyUser(id);
    return urls;
}
export const getUrl = async (shorturl)=>{
    const longUrl = await findUrl(shorturl);
    return longUrl;
}
