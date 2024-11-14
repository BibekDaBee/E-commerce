const express = require('express');
const User = require('../users/user.model');
const Order = require('../orders/orders.model');
const Reviews = require('../reviews/reviews.model');
const router = express.Router();

// User stats by email
router.get("/user-stats/:email", async (req, res) => {
    const{email} = req.params;
    if(!email) {
        return res.status(400).send({message: "Email is required"})
    }
    try {
        const user = await User.findOne({email: email})
        // console.log(user)
        if(!user) return res.status(404).send({message: "User not found"});

        // sum of all orders
        const totalPaymentsResult = await Order.aggregate([
            {$match: {email: email}},
            {
                $group: {_id: null, totalAmount: {$sum: "$amount"}}
            }
        ])

        const totalPaymentsAmount = totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;
        // console.log(totalPaymentsAmount)

        // Get Total reviews
        const totalReviews = await Reviews.countDocuments({userId: user._id})

        // Total product purchased
        const purchasedProductIds = await Order.distinct("products.productId", {email: email});
        const totalPurchasedProducts = purchasedProductIds.length;

        res.status(200).send({
            totalPayments: totalPaymentsAmount.toFixed(2),
            totalReviews,
            totalPurchasedProducts
        })
        
    } catch (error) {
        console.error("Error fetching user stats", error);
        res.status(500).send({message:"Failed to fetch user stats"})
    }
})

module.exports = router;