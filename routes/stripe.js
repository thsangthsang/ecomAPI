const router = require("express").Router();
const strip = require("stripe").(process.env.STRIPE);

router.post("/payment", (req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeERR, stripeRes) =>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    })
})

module.exports = router;