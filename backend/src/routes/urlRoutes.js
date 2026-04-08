import { Router } from "express"
import { createUrl, getUrl } from "../controllers/urlControllers.js";

const router = Router();

router.post("/", async (req, res) => {
    const { longUrl } = req.body;
    const shortUrl = await createUrl(longUrl);
    return res.json ({shortUrl});

})

router.get("/:id", async(req,res)=>{
    const {id}= req.params;
    const longUrl = await getUrl(id);
    res.redirect(longUrl);
})

export default router;