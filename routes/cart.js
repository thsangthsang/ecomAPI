const Cart = require("../models/Cart");
const { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin, 
} = require("./verifyToken");


const router = require("express").Router();
    

//CREATE

router.post("/",verifyToken, async(req,res)=>{
    const  newCart = newCart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }   catch(err){
        res.status(500).json(err);
    }
});
//router.get("/usertests", (req,res) => {
//    res.send("user test is  successfull");
//});

//router.post("/userposttest", (req,res)=>{
//    const username = req.body.username;
//    //console.log(username);
//    res.send("your username is: " + username);
//});


// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{

    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
             },
            {new: true}
        );
        res.status(200).json(updatedCart);
    } catch (err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete(":/id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch(err){
        res.status(500).json(err);
    }
});

//GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET ALL CART
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;