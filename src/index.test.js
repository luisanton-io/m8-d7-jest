import app from "./app.js"
import supertest from "supertest"
import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()

const request = supertest(app)

describe("Testing tests", () => {
  it("should test that true is true", () => {
    expect(true).toBe(true)
  })
})

describe("Testing endpoints", () => {
  beforeAll(done => {
    mongoose
      .connect(process.env.ATLAS_URL_DEV)
      .then(() => {
        console.log("Connected to Atlas!")
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it("should test that the /test endpoint is returning 200 and a success message", async () => {
    const response = await request.get("/test")

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Test success!")
  })

  it("should test that the /products endpoint is returning a list of products", async () => {
    const response = await request.get("/products")

    expect(response.status).toBe(200)
    expect(response.body.length).toBeDefined()
  })

  const validProduct = {
    name: "iPhone",
    price: 900,
  }

  it("should test that the /products endpoint is letting POST a new product", async () => {
    const response = await request.post("/products").send(validProduct)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(validProduct.name)
  })

  it("should test that the /products endpoint is returning one product with the correct id", async () => {
    const response = await request.post("/products").send(validProduct)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(validProduct.name)

    const _id = response.body._id

    const getResponse = await request.get(`/products/${_id}`)
    expect(getResponse.body.name).toBe(validProduct.name)
  })

  it("should test that /products/:id returns 404 for a non-existent ID", async () => {
    const response = await request.get("/products/612e2d855717a88a5ca19e0d")
    expect(response.status).toBe(404)
  })

  it("should test that /products/:id returns 400 for an invalid mongo ID", async () => {
    const response = await request.get("/products/abc")
    expect(response.status).toBe(400)
  })

  it("should test that the /products endpoint is letting to successfully DELETE a product", async () => {
    const response = await request.post("/products").send(validProduct)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(validProduct.name)

    const _id = response.body._id

    const deleteResponse = await request.delete(`/products/${_id}`)
    expect(deleteResponse.status).toBe(204)
  })

  it("should test that /products/:id is updating items successfully", async () => {
    const response = await request.post("/products").send(validProduct)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(validProduct.name)

    const _id = response.body._id

    const update = {
      name: "Go Kart",
      price: 2000,
    }

    const editResponse = await request.put(`/products/${_id}`).send(update)
    expect(editResponse.status).not.toBe(404)
    expect(editResponse.body.name).not.toBe(response.body.name)
    expect(typeof editResponse.body.name).toBe("string")
  })

  afterAll(done => {
    mongoose.connection.dropDatabase().then(() => {
      mongoose.connection.close()
      done()
    })
  })
})
