const baseRouter = require('express').Router()
const { createOrder, createPlan,
    createSubscription, checkIsAmountPaidOrNot, getSubscriptionDetails, getAllSubscriptions } = require('./razorpayService');
const {
    getRazorPayKeys
} = require('./config');
let {
    keyId, keySecret
} = getRazorPayKeys(process.env.STAGE)








const createSub = async (req, res) => {

    var data = req.body;
    try {

        let amount = data.amount.toFixed(2).toString().replace(".", "");

        let plan = {
            period: data.period,
            name: data.name,
            description: data.description,
            amount,
            currency: data.currency
        }


        let planDetails = await createPlan(plan);


        if (planDetails && !planDetails.error) {
            let subscription = {
                plan_id: planDetails.id,
                total_count: data.count,
                quantity: 1,
            };

            let subscriptionDetails = await createSubscription(subscription);

            subscriptionDetails.keyId = keyId;
            //        let abc = 9;
            res.status(200).json(subscriptionDetails);

        } else {
            throw { message: planDetails.error.description }
        }



    } catch (ex) {
        console.error(ex)
        res.status(404).json({ status: false, message: ex.message });
    }
}


const getSubDetails = async (req, res) => {

    var data = req.body;
    try {

        let details = await getSubscriptionDetails(data.subscriptionId)
        res.status(200).json(details);




    } catch (ex) {
        console.error(ex)
        res.status(404).json({ status: false, message: ex.message });
    }
}

const getall = async (req, res) => {

    try {

        let details = await getAllSubscriptions()
        res.status(200).json(details);




    } catch (ex) {
        console.error(ex)
        res.status(404).json({ status: false, message: ex.message });
    }
}


baseRouter.post('/subscription/create', createSub);
baseRouter.post('/subscription/getdetails', getSubDetails);
baseRouter.get('/subscription/getall', getall);

module.exports = baseRouter;