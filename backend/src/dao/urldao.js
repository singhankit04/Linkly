import urlModel from "../models/url.model.js"

export const saveUrl = async (longUrl, shortUrl, userId=null, secretMessage=null) => {
    try {
        const url = new urlModel({
            longUrl,
            shortUrl,
            user : userId,
            secretMessage
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

export const findUrl = async (shorturl) => {
    const url = await urlModel.findOneAndUpdate(
        { shortUrl: shorturl },
        { $inc: { clicks: 1 } },
    )
    return url?.longUrl;
}

export const findAllUrl = async () => {
    const allUrl = await urlModel.find({
        user:null
    })

    return allUrl
}

export const findAllUrlwithUser = async (id) => {
    const allUrl = await urlModel.find({
        user:id
    })

    return allUrl
}