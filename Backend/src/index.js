import dotenv from "dotenv";
import app from "./app.js";
import ConnectDb from "./Database/db.js"; 

dotenv.config({
    path: "./env"
});

app.get("/",(req,res)=>{
    res.send("Hello Foodi-Backend")
})

ConnectDb()
    .then(() => {
        app.listen(process.env.PORT || 6000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGO db connection failed !!! ", error);
    });
