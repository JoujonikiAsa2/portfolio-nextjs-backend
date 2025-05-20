import { Server } from "http"
import app from "./app"
import config from "./app/config"

const port = config.port
const main = () =>{
    const server:Server = app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
    })
}

main()