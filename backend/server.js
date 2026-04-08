import app from "./app.js"
import connectDB from "./src/config/db.js"


const startServer = async () => {
    try {
        await connectDB();

        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    }catch(error){
        console.error("failed to start server", error);
    }
}

startServer();