import urlModel from "../models/url.model.js"

export const saveUrl = async (longUrl, shortUrl, userId=null) => {
    try {
        const url = new urlModel({
            longUrl,
            shortUrl,
            user : userId 

        })
       
        await url.save();
    }catch(err){
        return(err.message)
    }

}
export const findslug= async (slug )=>{
    return await urlModel.findOne({
        shortUrl:slug
    })
}
export const findUrl = async (id) => {
    const url = await urlModel.findOneAndUpdate(
        { shortUrl: id },
        { $inc: { clicks: 1 } },
    )
    return url.longUrl;
}