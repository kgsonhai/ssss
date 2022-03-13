const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/graphQL_demo')
        console.log("connect successfully")
    } catch (error) {
        console.log("connect failed")
    }
}

module.exports = {connect}