const express=require("express")

const router = express.Router();


// data postman se lekar server/notes array  ko bhejte hai
const notes=[

]
router.post("/notes",(req,res)=>{

    notes.push(req.body)

    res.status(201).json({
        message:"note created succesfully"
    })
})


//data server se fetch kar dikhana ho

router.get("/notes",(req,res)=>{

    

    res.status(200).json({
        message:"notes fetch succusfully",
        note:notes
    })
})

router.patch("/notes/:index",(req,res)=>{
    const index=req.params.index

    const description=req.body.description

    notes[index].description=description

    res.status(200).json({
        message:"update succussfully"
    })
})


router.delete("/notes/:index",(req,res)=>{
   const index=req.params.index

   delete notes[index]

   res.status(200).json({
    message:"delete note succesfully"
   })
})