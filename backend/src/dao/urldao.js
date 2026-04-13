import urlModel from "../models/url.model.js"

export const saveUrl = async (shortUrl, longUrl, userId) => {
    try {
        const url = new urlModel({
            longUrl,
            shortUrl
        })
        if(userId){
            url.user=userId;
        }
        await url.save();
    }catch(err){
        return(err.message)
    }

}

export const findUrl = async (id) => {
    const url = await urlModel.findOneAndUpdate(
        { shortUrl: id },
        { $inc: { clicks: 1 } },
    )
    return url.longUrl;
}