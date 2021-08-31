import express from 'express'
import ProductModel from "./model.js"

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    const products = await ProductModel.find({})
    res.status(200).send(products)
})

productsRouter.get('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        res.status(200).send(product)
    } catch (error) {
        res.status(404).send()
    }
})

productsRouter.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(404).send()
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const product = new ProductModel(req.body)
        await product.save()

        res.status(201).send(product)
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }

})



export default productsRouter