import dotenv from "dotenv";
import app from "./app.js";
import ConnectDb from "./Database/db.js"; 
import jwt from "jsonwebtoken";

dotenv.config({
    path: "./env"
});

app.get("/",(req,res)=>{
    res.send("Hello Foodi-Backend")
})

 // jwt authentication
 app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
    res.send({token});
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

 


