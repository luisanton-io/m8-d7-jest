import app from "./app.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import supertest from "supertest"

dotenv.config()

const request = supertest(app)


// describe("Testing tests", () => {

//     it("should test that true is true", () => {
//         expect(true).toBe(true)
//     })

// })

describe("Testing endpoints", () => {

    beforeAll(done => {
        mongoose.connect(`${process.env.ATLAS_URL}/test`, () => {
            console.log("Connected to Atlas!")
            done()
        })
    })

    it("should test that the /test endpoint is returning 200 and a success message", async () => {
        const response = await request.get("/test")

        expect(response.status).toBe(200)
        expect(response.body.message).toBe("Test success!")
    })

    // it("should test that the /products endpoint is returning a list of products", async () => {

    //     const response = await request.get("/products")

    //     expect(response.status).toBe(200)
    //     expect(response.body.length).toBeDefined()
    // })

    // const validProduct = {
    //     name: "iPhone",
    //     price: 900
    // }

    // it("should test that the /products endpoint is letting POST a new product", async () => {
    //     const response = await request.post("/products").send(validProduct)

    //     expect(response.status).toBe(201)
    //     expect(response.body.name).toBe(validProduct.name)
    // })

    // it("should test that the /products endpoint is returning one product with the correct id", async () => {
    //     const response = await request.post("/products").send(validProduct)

    //     expect(response.status).toBe(201)
    //     expect(response.body.name).toBe(validProduct.name)

    //     const _id = response.body._id

    //     const getResponse = await request.get(`/products/${_id}`)
    //     expect(getResponse.body.name).toBe(validProduct.name)

    // })

    afterAll(done => {
        mongoose.connection.dropDatabase().then(() => {
            mongoose.connection.close()
            done()
        })
    })

})