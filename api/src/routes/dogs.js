require('dotenv').config()
const {Router} = require("express")
const request = require("request-promise")
const {Dog, Temperament} =require("../db")
const {YOUR_API_KEY} = process.env

const router = Router()

// router.get("/")

let idDog = 1

router.post("/", async(req, res) => {
    const {name, height, weight, life_span, image, temperaments} = req.body
    try {
        if (name && height && weight) {
            const newDog = await Dog.create({id: idDog++, ...req.body})

            // await Dog.update({
            //     id: newDog.id+264
            // }, {
            //     where: {
            //         id: newDog.id
            //     }
            // })
            // newDog.id = newDog.id + 264
            // await newDog.save()

            await newDog.addTemperaments(temperaments)
            return res.status(200).send(newDog)
        }
        else {
            res.status(404).send("Los atributos: name, height y weight no pueden ser nulos")
        }
    } catch(error) {
        res.status(400).send(error.message)
    }
})

router.get("/", async (req, res) => {
    const {name} = req.query
    try {
        const RUTA = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
        const dogsArrayApi = await request({
            uri: RUTA,
            json: true
        }).then(data => data.map(dog => ({
            id: dog.id,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            temperament: dog.temperament,
            image: dog.image.url
        })))
        let dogsArrayDB = (await Dog.findAll({
            attributes: {exclude: ["createdAt", "updatedAt"]},
            include: Temperament
        })).map(dog => ({...dog.dataValues, 
            temperaments: dog.temperaments.map(t => t.dataValues.name).join(", ")
        }))
        // let dogsArrayDB5 = dogsArrayDB.map(dog => ({...dog.dataValues,
        //     temperaments: dog.temperaments
        //     temperaments: dog.temperaments.map(temp => temp.name).join(", ")
        // }))
        // console.log(dogsArrayDB[0].temperaments[0].dataValues.name)
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
    } catch(error) {
        res.status(400).send(error.message)
    }
})

router.get("/:idRaza", async(req, res) => {
    const {idRaza} = req.params
    // console.log(typeof(idRaza))
    const RUTA = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    try {
        if (!idRaza.includes("db")) {
        // const RUTA = `https://api.thedogapi.com/v1/breeds/search?q=${idRaza}&api_key=${YOUR_API_KEY`
            var dog = await request({
                uri: RUTA,
                json: true
            })
            .then(data => {
                for (dog of data) {
                    if (dog.id === Number(idRaza)) {
                        return {
                            id: dog.id,
                            name: dog.name,
                            height: dog.height,
                            weight: dog.weight,
                            life_span: dog.life_span,
                            temperament: dog.temperament,
                            image: dog.image.url
                        }
                    }
                }
            })
        }
        else {
            var dog = (await Dog.findByPk(idRaza, {
                attributes: {exclude: ["createdAt", "updatedAt"]},
                include: Temperament
            }))
            if (dog) {
                dog = {...dog.dataValues, 
                    temperaments: dog.temperaments.map(t => t.dataValues.name).join(", ")
                }
            } 
        }
        // const dogsArrayDB = await Dog.findAll()
        // const dogsArray = [...dogsArrayApi, ...dogsArrayDB]
        // let dog
        // for (d of dogsArray) {
        //     if (d.name.toLowerCase() === idRaza.toLowerCase()) {
        //         dog = {
        //             id: d.id,
        //             name: d.name,
        //             height: d.height,
        //             weight: d.weight,
        //             life_span: d.life_span,
        //             temperament: d.temperament,
        //             image: d.image
        //         }
        //         break
        //     }
        // }
        if (dog) {
            return res.status(200).send(dog)
        }
        else {
            throw new Error("idRaza inválido")
        }        
    } catch(error) {
        res.status(400).send(error.message)
    }
})

module.exports=router