const mongoose = require("mongoose")

const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 6,
    },
    type: {
        type: String,
        enum: ["Flat", "House", "Room"],
        required: true,
    },
    desc: {
        type: String,
        required: true,
        min: 20,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sq_area: {
        type: Number,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    beds: {
        type: Number,
        required: true,
        min: 2,
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Property", PropertySchema)