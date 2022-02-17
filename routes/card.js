const express = require("express")
const path = require("path")
const CardController = require("../controllers/card")

function views(document){
    return path.join(__dirname,"../","views",document)
}

const router = express.Router()

// Definiendo el controlador
const cardController = new CardController()

router.get('/eliminar',function(request,response){
    return response.sendFile(views("eliminar.html"))
})

router.get('/archivo',function(request,response){
    return response.sendFile(views("archivo.html"))
})

router.post("/api/read/:id",async (req,res)=>{
    const id = req.params.id;
    const card = await cardController.select(id);
    return res.json(card);
})
router.post("/api/read/:id/:con",async (req,res)=>{
    const id = req.params.id;
    const con =req.params.con;
    const card = await cardController.selectT(id,con);
    return res.json(card);
})
router.post("/api/insert",async (req,res)=>{
    const data = req.body;
    const resp = await cardController.create(data);
    return res.json(resp);
})
router.put("/api/update/:id",async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const resp = await cardController.update(data,Number(id));
    return res.json(resp,id,data)
})
router.put("/api/updateCard/:id",async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const resp = await cardController.updateCarD(data,Number(id));
    return res.json(resp,id,data)
})
router.post("/api/delete/:id",async (req,res)=>{
    const id = req.params.id
    const user = await cardController.delete(id)
    return res.json(user)
})
// Una alternativa mejor es usar el metodo static de express:
// router.get("/js/users.js",(req,res)=>{
//     return res.sendFile(path.join(__dirname,"../","static","js","users.js"))
// })
module.exports = router