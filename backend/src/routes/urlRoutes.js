import { Router } from "express"
import { createUrlprivate, createUrlpublic, getPublicUrlbyUserId, getUrl, getUrlprivate, getUrlpublic } from "../controllers/urlControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserId } from "../middlewares/getUser.js";

const router = Router();

router.post("/create/public",getUserId, async (req, res) => {
    
    try {
        const userId = req.user?.id;
        const { longUrl, slug, secretMessage } = req.body;
       

        const shortUrl = await createUrlpublic(longUrl, slug, secretMessage, userId);

        return res.status(201).json({
            success: true,
            shortUrl
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }


})



router.post("/create/private", authMiddleware, async (req, res)=>{
      try {
        const { longUrl, slug, secretMessage } = req.body;
        const id = req.user?.id;
        if(!id){
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }
        const shortUrl = await createUrlprivate(longUrl, slug, id, secretMessage)
            

        return res.status(201).json({
            success: true,
            shortUrl
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

} )

router.get("/get/public", async (req, res) => {
    const allUrl = await getUrlpublic();
  
    res.status(200).json({
        success:true,
        allUrl
    })
})

router.get('/get/publicbyuser', getUserId, async(req, res)=>{
    const userId = req.user?.id;
    if(!userId){
        return res.status(401).json({
            success: false,
            message:"user not found"

        })
    }
    
    const urls = await getPublicUrlbyUserId(userId);
    res.status(200).json({
        success:true,
        urls
    })
})


router.get("/get/private",authMiddleware, async (req, res) => {
    const id = req.user.id;
    if(!id){
        return res.status(401).json({
            success: false,
            message: "user not found"
        })
    }
    const allUrl = await getUrlprivate(id);

    res.status(200).json({
        success:true,
        allUrl
    })
})


router.get("/redirect/:shorturl", async (req, res) => {
    const { shorturl } = req.params;
    const longUrl = await getUrl(shorturl);

    res.redirect(longUrl);
})

export default router;