import { Router } from "express"
import { createUrlwithUser, createUrlwithoutUser, getUrl, getUrlwithUser, getUrlwithoutUser } from "../controllers/urlControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create/withoutuser", async (req, res) => {
    
    try {
        const { longUrl, slug, secretMessage } = req.body;
       

        const shortUrl = await createUrlwithoutUser(longUrl, slug, secretMessage);

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



router.post("/create/withuser", authMiddleware, async (req, res)=>{
      try {
        const { longUrl, slug, secretMessage } = req.body;
        const id = req.user?.id;
        if(!id){
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }
        const shortUrl = await createUrlwithUser(longUrl, slug, id, secretMessage)
            

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

router.get("/get/withoutuser", async (req, res) => {
    const allUrl = await getUrlwithoutUser();
  
    res.status(200).json({
        success:true,
        allUrl
    })
})



router.get("/get/withuser",authMiddleware, async (req, res) => {
    const id = req.user.id;
    if(!id){
        return res.status(401).json({
            success: false,
            message: "user not found"
        })
    }
    const allUrl = await getUrlwithUser(id);

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