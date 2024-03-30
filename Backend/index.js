import  dotenv from "dotenv"
import  ConnectDb from "../Backend/src/Database/db.js"
import app from "./app.js"
// const port=process.env.PORT||5000
dotenv.config({
    path:"/.env"
})

ConnectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGO db connection failed !!! ", error);
})