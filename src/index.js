import app from "./app.js"
import mongoose from "mongoose"

const port = process.env.PORT || 3030

const { ATLAS_PRODUCTION_URL, ATLAS_STAGING_URL, ATLAS_REVIEW_URL, ATLAS_TEST_URL } = process.env

mongoose.connect(ATLAS_PRODUCTION_URL || ATLAS_STAGING_URL || ATLAS_REVIEW_URL || ATLAS_TEST_URL, () => {
    console.log("Connected to Atlas!")
    app.listen(port, () => {
        console.log("Server listening on port " + port)
    })
})
