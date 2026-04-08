import urlModel from "../models/url.model.js"

export const saveUrl = async (longUrl,shortUrl)=>{
    const url = new urlModel({
        longUrl,
        shortUrl
    })
    await url.save();
}


export const findUrl = async(id)=>{
    const url =await urlModel.findOneAndUpdate(
        {shortUrl:id},
        {$inc:{clicks:1}},
    )
    return url.longUrl;
}