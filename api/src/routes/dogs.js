require('dotenv').config()
const {Router} = require("express")
const request = require("request-promise")
const {Dog, Temperament} =require("../db")
const {Op} = require("sequelize")
const {YOUR_API_KEY} = process.env

const router = Router()

let idDog = 1

router.post("/", async(req, res) => {
    const {name, height, weight, life_span, image, temperaments} = req.body
    try {
        if (name && height && weight) {
            const dog = await Dog.findAll({where: {name}})
            if (dog.length) throw new Error(`El nombre de raza ${name} ya existe`)
            for (let t of temperaments) {
                const temp = await Temperament.findAll({where: {id:Number(t)}})
                if (!temp.length) throw new Error(`El temperamento ${t} no existe`)
            }

            const newDog = await Dog.create({id: idDog++, ...req.body})
            await newDog.addTemperaments(temperaments)
            return res.status(200).send(newDog)    
        }
        else {
            throw new Error("Los atributos: name, height y weight no pueden ser nulos")
        }
    } catch(error) {
        res.status(400).send(error.message)
    }
})

router.get("/", async (req, res) => {
    const {name, location} = req.query
    const RUTA = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    let dogsArrayApi = []
    let dogsArrayDB = []
    try {
        if (location === "API" || location === undefined) {
            dogsArrayApi = await request({
                uri: RUTA,
                json: true
            }).then(data => data.map(dog => ({
                id: dog.id,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament,
                image: dog.image.url
            })))
        }
        if (location === "DB" || location === undefined) {
                dogsArrayDB = (await Dog.findAll({
                attributes: {exclude: ["createdAt", "updatedAt"]},
                include: Temperament
            })).map(dog => ({...dog.dataValues, 
                temperaments: dog.temperaments.map(t => t.dataValues.name).join(", ")
            }))
        }
       
        const dogsArray = [...dogsArrayApi, ...dogsArrayDB]
        if (name) {
            var arrayDogs = await dogsArray.filter(dog => {
                if (dog.name.toLowerCase().includes(name.toLowerCase())) return true
            })
            if (!arrayDogs.length) throw new Error("No se ha encontrado niguna raza con este nombre")
        }
        else {
            var arrayDogs = dogsArray
        }  
        res.status(200).send(arrayDogs)
    }
    catch(error) {
        res.status(400).send(error.message)
    }
})

router.get("/:raza_perro", async(req, res) => {
    const {raza_perro} = req.params
    const RUTA = `https://api.thedogapi.com/v1/breeds/search?q=${raza_perro}&api_key=${YOUR_API_KEY}`
    var dog
    try {    
        dogFindedAPI = await request({
            uri: RUTA,
            json: true
        })
        .then(data => {
            return {
                id: data[0].id,
                name: data[0].name,
                height: data[0].height.metric,
                weight: data[0].weight.metric,
                life_span: data[0].life_span,
                temperament: data[0].temperament,
                origin: data[0].origin,
                breed_group: data[0].breed_group,
                image: `https://cdn2.thedogapi.com/images/${data[0].reference_image_id}.jpg`
        }})
        .catch(()=> null)
        
        var dogFindedDB = (await Dog.findOne({
            where: {name: raza_perro[0].toUpperCase() + raza_perro.slice(1).toLowerCase()},
            attributes: {exclude: ["createdAt", "updatedAt"]},
            include: Temperament
        }))
        if(dogFindedDB) {
            dog = {...dogFindedDB.dataValues, 
                temperaments: dogFindedDB.temperaments.map(t => t.dataValues.name).join(", ")
            } 

        } else {
            if (dogFindedAPI) {dog = dogFindedAPI}
            else {throw new Error(`El nombre de la raza ${raza_perro} no se encontró`)}
        }
        return res.status(200).send(dog)      
    }
    catch(error) {
        res.status(400).send(error.message)
    }
})

module.exports=router