require("dotenv").config()
const express = require("express")
const morgan = require('morgan')
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const uniqueValidator = require('mongoose-unique-validator')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URI)
    .then(result=>{
    console.log("connected to MongoDB")
    })
    .catch(error=>{
        console.log("error connecting to MongoDB",error.message)
    })

//user Schema
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true
    }
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //the passwordHash should not be revealed
        delete passwordHash
    }
})

// user model
const User = mongoose.model("User",userSchema)


// symptom schema
const symptomSchema = mongoose.Schema({
    symptom:{
        type:String,
        required:true,
        unique:true
    },
    boolean:Boolean
})

symptomSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //the passwordHash should not be revealed
        delete passwordHash
    }
})


// symptom model
const Symptom = mongoose.model("Symptom",symptomSchema)


// result schema
const resultSchema = mongoose.Schema({
    result:{
        type:String,
        required:true
    },
    diagnosis:{
        type:String,
        required:true
    },
    recommendations:{
        type:[String],
        required:true
    }
})

// result model
const Result = mongoose.model("Result",resultSchema)

// /api/users the api for which we are going to GET and Create users

app.post("/api/users",async (request,response)=>{
    const {username,password} = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)
    const user = new User({
        username,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

})


app.get("/api/users",async (request,response)=>{

    const users = await User.find({})
    response.status(200).json(users)

})

app.delete("/api/users/:id",async (request,response)=>{
    const id = request.params.id

    const deletedUser = await User.findByIdAndDelete(id)
    response.status(403).json({message:"deleted"})
})



// /api/login for handeling login

app.post("/api/login",async (request,response)=> {

    const {username,password} = request.body
    const user = await User.findOne({username})
    const correctPassword = user==="null" ? false : await bcrypt.compare(password,user.passwordHash)

    if (!(user && correctPassword)) {
        return response.status(401).json({message:"wrong credentials"})
    }

    const userToken = {
        username:user.username,
        id:user.id
    }

    const token = jwt.sign(userToken,process.env.SECRET,{expiresIn:60*60})
    //console.log("response = ",{token,username:user.username})
    response.status(200).json({token,username:user.username})

})


// /api/symptoms
const getTokenFrom = (request) =>{
    const authorization = request.get("authorization")
    if(authorization && authorization.startsWith("Bearer ")){
        return authorization.replace("Bearer ", "")
    }
    return null
}


app.post('/api/symptoms',async (request,response)=>{
    const {symptom,boolean} = request.body
    
    const symptom_to_save = new Symptom ({
        symptom,boolean
    })

    const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
    if(!decodedToken){
        return response.status(401).json({message:"token failed"})
    }
    console.log("token success")
    const savedSymptom = await symptom_to_save.save()
    response.status(201).json(savedSymptom)
})

app.put("/api/symptoms/:id",async (request,response)=>{
    const id = request.params.id
    const {symptom,boolean} = request.body
    const symptom_to_put = {
        symptom,boolean
    }
    console.log("symptoms to put",symptom_to_put)
    try {
        const updatedSymptom = await Symptom.findByIdAndUpdate(id,symptom_to_put,{new:true})
        return response.status(200).json(updatedSymptom)
    } catch(error) {
        console.log("error = ",error)
    }
})

app.get('/api/symptoms',async (request,response)=>{
    const symptoms = await Symptom.find({})
    response.status(200).json(symptoms)
})

app.delete('/api/symptoms/:id',async (request,response)=>{
    const id = request.params.id
    console.log("id to delete = ",id)
    const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
    if(!decodedToken){
        return response.status(401).json({message:"token failed"})
    }
    console.log("jwt = ",decodedToken)
    const symptom = await Symptom.findByIdAndDelete(id)
    response.status(204).end()
})

// /api/results
app.post('/api/results',async (request,response)=>{
    const {result,diagnosis,recommendations} = request.body
    
    const result_to_save = new Result({
        result,diagnosis,recommendations
    })
    console.log(result_to_save)
    const savedResult = await result_to_save.save()
    response.status(201).json(savedResult)
    
})

app.get('/api/results',async (request,response)=>{
    const results = await Result.find({})
    response.status(200).json(results)
})



PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})

