const Property = require('../models/Property')
const propertyController = require('express').Router()

const verifyToken = require('../middleside/verifyToken')


propertyController.get('/getAll', async (req, res) => {
    try {
        const properties = await Property.find({})

        return res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

propertyController.get('/find/featured', async (req, res) => {
    try {
        const featuredProperties = await Property.find({ featured: true }).populate("currentOwner", '-password')
        return res.status(200).json(featuredProperties)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


propertyController.get('/find', async (req, res) => {
    const type = req.query
    //let properties = []
    try {
        if (type) {
            const properties = await Property.find(type).populate("currentOwner", '-password')
            return res.status(200).json(properties)
        } else {
            //properties = await Property.find({})
            return res.status(500).json({ msg: 'no such type' })
        }


    } catch (error) {
        return res.status(500).json(error.message)
    }
})


propertyController.get('/find/types', async (req, res) => {
    try {

        const FlatType = await Property.countDocuments({ type: 'Flat' })
        const HouseType = await Property.countDocuments({ type: 'House' })
        const RoomType = await Property.countDocuments({ type: 'Room' })

        return res.status(200).json({ House: HouseType, Flat: FlatType, Room: RoomType })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

propertyController.get('/find/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('currentOwner', '-password')

        if (!property) {
            throw new Error('No such property with that id')
        } else {
            return res.status(200).json(property)
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

//add new
propertyController.post('/', verifyToken, async (req, res) => {
    try {
        const newProperty = await Property.create({ ...req.body, currentOwner: req.user.id })
        return res.status(201).json(newProperty)
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
})

//update
propertyController.put('/:id', verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (property.currentOwner.toString() !== req.user.id.toString()) {
            throw new Error("You are not allowed to update other people properties")
        }

        else {
            const updatedProperty = await Property.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )

            return res.status(200).json(updatedProperty)
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

//delete

propertyController.delete("/:id", verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (property.currentOwner.toString() !== req.user.id.toString()) {
            throw new Error("You are not allowed to delete other people properties")
        }

        else {
            await property.deleteOne()

            return res.status(200).json({ msg: "Successfully deleted property" })
        }

    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = propertyController