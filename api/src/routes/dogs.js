require('dotenv').config()
const {Router} = require("express")
const request = require("request-promise")
const {Dog} =require("../db")
const {YOUR_API_KEY} = process.env

const router = Router()

// router.get("/")

router.post("/", async(req, res) => {
    const {name, hight, weight, years} = req.body
    try {
        if (name && hight && weight) {
            const newDog = await Dog.create((req.body))
            return res.status(200).send(newDog)
        }
        else {
            res.status(404).send("Los atributos: name, hight y weight no pueden ser nulos")
        }
    } catch(error) {
        res.status(400).send(error.message)
    }
})

router.get("/", async (req, res) => {

    try {
        const RUTA = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
        const dogsArray = await request({
            uri: RUTA,
            json: true
        }).then(data => data)
        res.status(200).send(dogsArray)
    } catch(error) {
        res.status(400).send(error.message)
    }

})

module.exports=router