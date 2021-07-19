'use strict'
const Razorpay = require('razorpay');
const {
    getRazorPayKeys
} = require('./config');

let {
    keyId, keySecret
} = getRazorPayKeys('test')


const checkIsAmountPaidOrNot = async (id) => {
    var instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    return new Promise((resolve, reject) => {
        instance.orders.fetch(id).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        });
    });
}


const createOrder = async (amount) => {
    var instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    return new Promise((resolve, reject) => {
        instance.orders.create({
            amount: amount,
            currency: 'USD',
            receipt: 'billing',
            payment_capture: 1

        }).then((response) => {
            console.log(response);
            resolve(response);
        }).catch((error) => {
            console.log(error);
            resolve(error);
        });
    });
}

const createPlan = async (plan) => {
    var instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    return new Promise((resolve, reject) => {
        instance.plans.create({
            period: plan.period,
            interval: 1,
            item: {
                name: plan.name,
                amount: plan.amount,
                currency: plan.currency,
                description: plan.description
            }
        }).then((response) => {
            console.log(response);
            resolve(response);
        }).catch((error) => {
            console.log(error);
            resolve(error);
        });
    });
}

const createSubscription = async (subscription) => {
    var instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    return new Promise((resolve, reject) => {
        instance.subscriptions.create({
            plan_id: subscription.plan_id,
            total_count: subscription.total_count,
            quantity: subscription.quantity,
            customer_notify: 1,
        }).then((response) => {
            console.log(response);
            resolve(response);
        }).catch((error) => {
            console.log(error);
            resolve(error);
        });
    });
}


const getSubscriptionDetails = async (subscriptionId) => {
    var instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    return new Promise((resolve, reject) => {
        instance.subscriptions.fetch({
            subscriptionId
        }).then((response) => {
            console.log(response);
            resolve(response);
        }).catch((error) => {
            console.log(error);
            resolve(error);
        });
    });
}


const getAllSubscriptions = async () => {
    var instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    return new Promise((resolve, reject) => {
        instance.subscriptions.all().then((response) => {
            console.log(response);
            resolve(response);
        }).catch((error) => {
            console.log(error);
            resolve(error);
        });
    });
}



const cancelSubscription = async (subscriptionId) => {
    var instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    return new Promise((resolve, reject) => {
        instance.subscriptions.cancel(
            subscriptionId
        ).then((response) => {
            console.log(response);
            resolve(response);
        }).catch((error) => {
            console.log(error);
            resolve(error);
        });
    });
}



module.exports = {
    checkIsAmountPaidOrNot,
    createOrder,
    createPlan,
    createSubscription,
    getSubscriptionDetails,
    getAllSubscriptions,
    cancelSubscription
}