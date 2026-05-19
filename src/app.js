

const express=require("express");

const app=express()

const authroutes=require("./routes/auth.routes")
 const notesRoutes=require("./routes/notes.routes")


app.use(express.json())



app.use("/api/auth",authroutes)
app.use("/api/carts",notesRoutes)


module.exports=app