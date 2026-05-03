import urlModel from "../models/url.model.js"

export const saveUrl = async (longUrl, shortUrl, userId=null, secretMessage=null, type="public") => {
    try {
        const url = new urlModel({
            type,
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


export const findAllUrl = async () => {
    const allUrl = await urlModel.find({
        type:"public"
    }).sort({createdAt:-1})

    return allUrl
}

export const findPublicUrlbyUser = async (id) => {
    const allUrl = await urlModel.find({
        type:"public",
        user:id
    }).sort({createdAt:-1})

    return allUrl
}
export const findAllUrlprivate = async (id) => {
    const allUrl = await urlModel.find({
        type:"private",
        user:id

    }).sort({createdAt:-1})

    return allUrl
}



export const findUrl = async (shorturl) => {
    const url = await urlModel.findOneAndUpdate(
        { shortUrl: shorturl },
        { $inc: { clicks: 1 } },
        
    )
    return url?.longUrl;
}
