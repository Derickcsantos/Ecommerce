const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)
router.post("/checkout", authToken, async (req, res) => {
    try {
        // Verifica se o corpo da requisição contém itens no carrinho
        const { cartItems } = req.body;
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Carrinho vazio" });
        }

        // Mapeia os itens do carrinho para criar os preços do Stripe
        const line_items = cartItems.map(item => ({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: item.productId.productName,
                    images: [item.productId.productImage[0]],
                },
                unit_amount: item.productId.sellingPrice * 100, // O Stripe usa centavos
            },
            quantity: item.quantity,
        }));

        // Criação da sessão de checkout do Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,  // Substitua com a URL do seu frontend para sucesso
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,    // Substitua com a URL do seu frontend para cancelamento
        });

        // Retorne o sessionId para o frontend para que ele possa redirecionar para o Stripe
        res.json({ id: session.id });

    } catch (error) {
        console.error("Erro ao criar a sessão do Stripe:", error);
        res.status(500).json({ error: "Erro ao processar o pagamento" });
    }
});







module.exports = router