require('dotenv').config()
const {Router} = require("express")
const {Temperament} =require("../db")
const request = require("request-promise")
const {YOUR_API_KEY} = process.env

const router = Router()

router.get("/", async (req, res) => {

    try {
        const temperamentsArray = await Temperament.findAll()
        if (temperamentsArray.length) {
            res.status(200).send(temperamentsArray)
        } else {
            const RUTA = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
            const dogsArray = await request({
                uri: RUTA,
                json: true
            }).then(data => data)
            // dogsArray.forEach(async (dog) => {
            //     dog.temperament && dog.temperament.split(", ").forEach(temperament => {
            //         !temperamentsArray.includes(temperament)? temperamentsArray.push(temperament):null
            //     })
            // })

            dogsArray.forEach(async (dog) => {
                dog.temperament && dog.temperament.split(", ").forEach(temperament => {
                    !temperamentsArray.includes(temperament)? temperamentsArray.push({name: temperament}):null
                })
            })

            // console.log(temperamentsArray)
            // const temperaments = temperamentsArray.map( async (name) => {
            //     const newTemperament = await Temperament.create({name})
            //     console.log(newTemperament)
            //     return newTemperament
            // })
            // console.log(temperaments)


            // let temperaments = []
            // for (name of temperamentsArray) {
            //     const newTemperament = await Temperament.create({name})
            //     temperaments.push(newTemperament)
            // }

            const newTemperaments = await Temperament.bulkCreate(temperamentsArray)
            res.status(200).json(newTemperaments)
        }      
    } catch(error) {
        res.status(400).send(error.message)
    }
})

module.exports=router