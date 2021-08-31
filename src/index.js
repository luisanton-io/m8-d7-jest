import app from "./app.js"
import mongoose from "mongoose"

const port = process.env.PORT || 3001

mongoose
  .connect(process.env.ATLAS_URL_PROD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Atlas!")
    app.listen(port, () => {
      console.log("Server listening on port " + port)
    })
  })
  .catch(err => console.log(err))
