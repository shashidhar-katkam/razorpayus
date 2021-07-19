
const getRazorPayKeys = (stage, Type) => {
    if (stage === 'prod') {
        return {
            keyId: "rzp_live_RQZD1Ix1uu8Sa4",
            keySecret: "BF1RCa846dtXvCb5e06B2zNU"
        }
    } else {
        return {
            keyId: "rzp_test_kuSPqGxLzc5aAX",
            keySecret: "iOENpyiEWCv3Ws9UmvgE4kuy"
        }
    }
}


module.exports = {
    getRazorPayKeys
}