import { Server } from "http"
import app from "./app"
import config from "./app/config"
import mongoose from "mongoose"

const port = config.port
const main = async() =>{
    await mongoose.connect(config.database_url as string)
    const server:Server = app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
    })
}

main()