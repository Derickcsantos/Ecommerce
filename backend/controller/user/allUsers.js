const userModel = require("../../models/userModel")

async function allUsers(req,res){
    try{
        console.log("Todos os IDs dos usuario",req.userId)

        const allUsers = await userModel.find()
        
        res.json({
            message : "Todos os usuarios ",
            data : allUsers,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = allUsers