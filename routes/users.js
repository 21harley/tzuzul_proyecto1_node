const express = require("express")
const path = require("path")
const UserController = require("../controllers/users")

function views(document){
    return path.join(__dirname,"../","views",document)
}
const router = express.Router()

// Definiendo el controlador
const userController = new UserController()

// Asignando middleware al router
//router.use('/users')

router.get('/registro',function(request,response){
    return response.render("registro")
})

router.get('/tema',function(request,response){
    return response.render("tema")
})

router.get('/creditos',function(request,response){
    return response.render("creditos")
})

router.get('/cerrar',function(request,response){
    return response.render("index")
})
/*
router.get('/registro',function(request,response){
    return response.sendFile(views("registro.html"))
})

router.get('/tema',function(request,response){
    return response.sendFile(views("tema.html"))
})

router.get('/creditos',function(request,response){
    return response.sendFile(views("creditos.html"))
})

router.get('/cerrar',function(request,response){
    return response.sendFile(views("index.html"))
})
*/
router.post('/registro',async function(request,response){
    //console.log(request.body) // {name: 'Tzuzul Code',email: 'mail@tzuzulcode.com',birthday: '2022-02-07'}
    const persona = request.body
    const user = await userController.create(persona)
    // Nos lleva luego a la página principal
    if(user.success){
        return response.redirect("/")
    }else{
        return response.redirect("/registro")
    }
})

router.post('/',async function(request,response){
    //console.log(request.body) // {name: 'Tzuzul Code',email: 'mail@tzuzulcode.com',birthday: '2022-02-07'}
    const persona = request.body
    //console.log(persona,persona.correo,persona.clave);
    const user = await userController.consulta(persona)
    // Nos lleva luego a la página principal
    if(user.length==1){
        return response.redirect(`/app/${user[0].id}`)
    }else{
        return response.redirect("/registro")
    }
    
})

//users
router.get("/usersPug",async (req,res)=>{
    var users = await userController.readAll()
    return res.render("users",{usuarios:users,title:"Usuarios"})
})
/*
router.get("/users",(req,res)=>{
    return res.sendFile(views("users.html"))
})
*/

//app
router.get("/app/:id",(req,res)=>{
    return res.render("app")
})
/*
router.get("/app/:id",(req,res)=>{
    return res.sendFile(views("app.html"))
})
*/

router.get("/api/users",async (req,res)=>{
    var users = await userController.readAll()
    return res.json(users)
})
router.put("/api/users/update/:id",async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const resp = await userController.update(data,Number(id));
    return res.json(resp,id,data)
})
router.delete("/api/users/delete/:id",async (req,res)=>{
    const id = req.params.id;
    const user = await userController.delete(id);
    console.log(user);
    return res.json({id,user});
})
// Una alternativa mejor es usar el metodo static de express:
// router.get("/js/users.js",(req,res)=>{
//     return res.sendFile(path.join(__dirname,"../","static","js","users.js"))
// })
module.exports = router