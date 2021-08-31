import express from "express"
import ProductModel from "./model.js"

const productsRouter = express.Router()

productsRouter.get("/", async (req, res) => {
  const products = await ProductModel.find({})
  res.status(200).send(products)
})

productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
    if (!product) res.status(404).send({ message: `Product with id ${req.params.id} not found.` })
    res.status(200).send(product)
  } catch (error) {
    res.status(400).send()
  }
})

productsRouter.post("/", async (req, res) => {
  try {
    const product = new ProductModel(req.body)
    await product.save()

    res.status(201).send(product)
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
})

productsRouter.delete("/:id", async (req, res) => {
  try {
    const deleted = await ProductModel.findByIdAndDelete(req.params.id)
    if (!deleted) res.status(404).send({ message: `Product with id ${req.params.id} not found.` })
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" })
  }
})

productsRouter.put("/:id", async (req, res) => {
  try {
    const updated = await ProductModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    if (!updated) res.status(404).send({ message: `Product with id ${req.params.id} not found.` })
    res.send(updated)
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" })
  }
})

export default productsRouter
