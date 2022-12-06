const {Router} = require("express")
const {Dog} =require("../db")

const router = Router()

// router.get("/")

router.post("/", async(req, res) => {
    const {name, hight, weight, years} = req.body
    try {
        const newDog = await Dog.create((req.body))
        res.status(200).send(newDog)
    } catch(error) {
        res.status(400).send(error.message)
    }
})

module.exports=router