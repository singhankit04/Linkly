import { Router } from "express"
import { createUrlwithUser, createUrlwithoutUser, getUrl } from "../controllers/urlControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    
    try {
        const { longUrl, slug } = req.body;
        const id = req.user?.id;

        const shortUrl = id
            ? await createUrlwithUser(longUrl, slug, id)
            : await createUrlwithoutUser(longUrl);

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

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const longUrl = await getUrl(id);

    res.redirect(longUrl);
})

export default router;