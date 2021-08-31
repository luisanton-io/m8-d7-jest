import app from "./app.js"
import mongoose from "mongoose"

const port = process.env.PORT || 3030

mongoose.connect(`${process.env.ATLAS_PRODUCTION_URL}`, () => {
    console.log("Connected to Atlas!")
    app.listen(port, () => {
        console.log("Server listening on port " + port)
    })
})
