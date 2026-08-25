const mongoose = require("mongoose");

const { Schema } = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}


// Order Schema
const orderSchema = new Schema({
    item: String,
    price: Number,
});


// Customer Schema
const customerSchema = new Schema({
    name: String,

    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        }
    ]
});


// Models
const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);


// Create Customer and Orders
const createCustomer = async () => {

    // Order create
    let order1 = await Order.create({
        item: "Laptop",
        price: 80000,
    });

    let order2 = await Order.create({
        item: "Mobile",
        price: 50000,
    });


    // Customer create
    let customer = await Customer.create({
        name: "Fatima",
        orders: [order1._id, order2._id],
    });

    console.log("Customer created:");
    console.log(customer);
};


// Find Customer with Orders
const findCustomer = async () => {

    let result = await Customer.findOne({
        name: "Fatima"
    }).populate("orders");

    console.log("Customer with orders:");
    console.log(result);
};


createCustomer();