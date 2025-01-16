const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
    try{
        const { email, password, name} = req.body

        const user = await userModel.findOne({email})

        console.log("user",user)

        if(user){
            throw new Error("Usuario ja existe")
        }

        if(!email){
           throw new Error("Por favor preencha o email")
        }
        if(!password){
            throw new Error("Por favor preencha a senha")
        }
        if(!name){
            throw new Error("Por favor preencha o nome")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Algo errado")
        }

        const payload = {
            ...req.body,
            role : "COMUM",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "Usuario criado com sucesso"
        })


    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController