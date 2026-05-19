

const app = require("./src/app");
const connectDB=require("./src/config/db")

connectDB()


try{
app.listen(3000,()=>{
    console.log("server is running on port no 3000")
});
} catch(err){
    console.log("Not  Connet to server")
}
