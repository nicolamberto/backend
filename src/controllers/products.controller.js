import productDao from "../daos/dbManager/product.dao.js";


export const getDatosControllers = async (req, res) => {
    const { page, limit, query, sort } = req.query
    try {
        const products = await productDao.getAllProducts(page, limit, query, sort)
        res.status(200).json({ message: 'OK', products })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}
