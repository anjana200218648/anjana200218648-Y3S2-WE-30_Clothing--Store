import express from "express"// Express framework for building the server
import cors from "cors"
import { connectDB } from "./config/db.js"
import clothRouter from "./routes/clothRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



//app config
const app = express()
const port = 4000 //port set

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

//API endpoints
app.use("/api/cloth", clothRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})